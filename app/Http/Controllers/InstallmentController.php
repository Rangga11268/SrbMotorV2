<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Installment;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

use Midtrans\Transaction as MidtransTransaction;
use Barryvdh\DomPDF\Facade\Pdf;

class InstallmentController extends Controller
{
    /**
     * Download Payment Receipt
     */
    public function downloadReceipt(Installment $installment)
    {
        if ($installment->transaction->user_id !== Auth::id()) {
            abort(403);
        }

        if ($installment->status !== 'paid') {
            return redirect()->back()->with('error', 'Kuitansi hanya tersedia untuk cicilan yang sudah lunas.');
        }

        $pdf = Pdf::loadView('installments.receipt', compact('installment'));
        return $pdf->download('kuitansi-pembayaran-cicilan-' . $installment->installment_number . '.pdf');
    }
    public function checkPaymentStatus(Installment $installment)
    {
        if ($installment->transaction->user_id !== Auth::id()) {
            abort(403);
        }

        if (!$installment->midtrans_booking_code) {
            return response()->json(['message' => 'Belum ada riwayat pembayaran online'], 404);
        }

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');

        try {
            $status = MidtransTransaction::status($installment->midtrans_booking_code);
            
            $transactionStatus = $status->transaction_status;
            $type = $status->payment_type;
            $fraud = $status->fraud_status;

            if ($transactionStatus == 'capture') {
                if ($type == 'credit_card'){
                    if($fraud == 'challenge'){
                        $installment->update(['status' => 'waiting_approval']);
                    } else {
                        $installment->update(['status' => 'paid', 'paid_at' => now(), 'payment_method' => 'midtrans_' . $type]);
                    }
                }
            } else if ($transactionStatus == 'settlement') {
                 // Determine specific payment method
                 $methodStr = 'midtrans_' . $type;
                
                 // Check for VA (Bank Transfer)
                 // Note: MidtransTransaction::status returns object, va_numbers is array of objects
                 if ($type == 'bank_transfer' && isset($status->va_numbers)) {
                     // Check if va_numbers is array and has items
                     $vaNumbers = $status->va_numbers;
                     if (is_array($vaNumbers) && count($vaNumbers) > 0) {
                          $bank = $vaNumbers[0]->bank ?? 'other';
                          $methodStr = 'midtrans_' . $bank . '_va';
                     }
                 }
                 // Check for E-Wallet
                 else if ($type == 'gopay' || $type == 'shopeepay') {
                     $methodStr = 'midtrans_' . $type;
                 }
                 // Check for Cstore
                 else if ($type == 'cstore') {
                     $store = $status->store ?? 'store';
                     $methodStr = 'midtrans_' . $store;
                 }

                $installment->update(['status' => 'paid', 'paid_at' => now(), 'payment_method' => $methodStr]);

                // Check and update Transaction Status if all installments paid
                $transaction = $installment->transaction;
                if ($transaction) {
                    $unpaid = $transaction->installments()->where('status', '!=', 'paid')->count();
                    if ($unpaid == 0) {
                         if ($transaction->transaction_type == 'CASH') {
                            $transaction->update(['status' => 'payment_confirmed']);
                         } else {
                            $transaction->update(['status' => 'completed']);
                         }
                    }
                }
            } else if ($transactionStatus == 'pending') {
                $installment->update(['status' => 'pending']);
            } else if ($transactionStatus == 'deny') {
                $installment->update(['status' => 'waiting_approval']);
            } else if ($transactionStatus == 'expire') {
                $installment->update(['status' => 'overdue']);
            } else if ($transactionStatus == 'cancel') {
                $installment->update(['status' => 'overdue']);
            }

            return response()->json([
                'status' => $transactionStatus,
                'message' => 'Status pembayaran diperbarui: ' . $transactionStatus
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Generate Midtrans Snap Token
     */
    public function createPayment(Installment $installment)
    {
        if ($installment->transaction->user_id !== Auth::id()) {
            abort(403);
        }

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        $orderId = 'INST-' . $installment->id . '-' . time();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $installment->amount,
            ],
            'customer_details' => [
                'first_name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ],
            'item_details' => [
                [
                    'id' => 'INST-' . $installment->id,
                    'price' => (int) $installment->amount,
                    'quantity' => 1,
                    'name' => 'Cicilan Ke-' . $installment->installment_number . ' ' . $installment->transaction->motor->name,
                ]
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            
            $installment->update([
                'snap_token' => $snapToken,
                'midtrans_booking_code' => $orderId // Save Order ID for status checking
            ]);

            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())
            ->whereHas('creditDetail') // Only get credit transactions
            ->with(['installments' => function ($query) {
                $query->orderBy('installment_number', 'asc');
            }, 'motor'])
            ->whereIn('status', ['disetujui', 'completed', 'APPROVED']) // Only active/approved loans
            ->latest()
            ->get();

        return Inertia::render('Installments/Index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request, Installment $installment)
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'payment_method' => 'required|string',
        ]);

        // Verify ownership
        if ($installment->transaction->user_id !== Auth::id()) {
            abort(403);
        }

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            
            $installment->update([
                'payment_proof' => $path,
                'payment_method' => $request->payment_method,
                'status' => 'waiting_approval',
                'paid_at' => now(),
            ]);

            // --- WhatsApp Notification: Notify Admin of New Payment Proof ---
            try {
                $adminPhone = config('services.fonnte.admin_phone');
                if ($adminPhone) {
                    $user = Auth::user();
                    $motor = $installment->transaction->motor->name;
                    
                    if ($installment->installment_number == 0) {
                        $typeLabel = $installment->transaction->transaction_type === 'CASH' ? 'Booking Fee' : 'Uang Muka (DP)';
                    } else {
                        $typeLabel = "Cicilan Ke-{$installment->installment_number}";
                    }

                    $msg = "*[ADMIN] Bukti Pembayaran Baru*\n\nUser: {$user->name}\nUnit: {$motor}\nJenis: {$typeLabel}\n\nSegera verifikasi di dashboard.";
                    \App\Services\WhatsAppService::sendMessage($adminPhone, $msg);
                }
            } catch (\Exception $e) { \Illuminate\Support\Facades\Log::error('WA Error: ' . $e->getMessage()); }

            return redirect()->back()->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi admin.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah bukti pembayaran.');
    }

    /**
     * Approve the installment payment (Admin only).
     */
    public function approve(Installment $installment)
    {
        if ($installment->status !== 'waiting_approval') {
            return redirect()->back()->with('error', 'Cicilan ini tidak dalam status menunggu persetujuan.');
        }

        $installment->update([
            'status' => 'paid',
        ]);

        // --- WhatsApp Notification: Notify User of Approval ---
        try {
            $user = $installment->transaction->user;
            if ($user && $user->phone) { 
                $phone = $installment->transaction->customer_phone ?? $user->phone;
                
                if ($phone) {
                     if ($installment->installment_number == 0) {
                        $typeLabel = $installment->transaction->transaction_type === 'CASH' ? 'Booking Fee' : 'Uang Muka (DP)';
                     } else {
                        $typeLabel = "cicilan ke-{$installment->installment_number}";
                     }

                     $msg = "Halo {$user->name},\n\nPembayaran *{$typeLabel}* Anda telah *DIVERIFIKASI/DITERIMA*.\n\nTerima kasih atas pembayarannya.\n\n- SRB Motor";
                     \App\Services\WhatsAppService::sendMessage($phone, $msg);
                }
            }
        } catch (\Exception $e) { \Illuminate\Support\Facades\Log::error('WA Error: ' . $e->getMessage()); }

        return redirect()->back()->with('success', 'Pembayaran cicilan berhasil diverifikasi.');
    }

    /**
     * Reject the installment payment (Admin only).
     */
    public function reject(Installment $installment)
    {
        if ($installment->status !== 'waiting_approval') {
            return redirect()->back()->with('error', 'Cicilan ini tidak dalam status menunggu persetujuan.');
        }

        $installment->update([
            'status' => 'pending', 
        ]);

        // --- WhatsApp Notification: Notify User of Rejection ---
        try {
            $user = $installment->transaction->user;
            $phone = $installment->transaction->customer_phone ?? $user->phone;

            if ($phone) {
                  if ($installment->installment_number == 0) {
                     $typeLabel = $installment->transaction->transaction_type === 'CASH' ? 'Booking Fee' : 'Uang Muka (DP)';
                  } else {
                     $typeLabel = "cicilan ke-{$installment->installment_number}";
                  }
                  
                  $msg = "Halo {$user->name},\n\nMohon maaf, bukti pembayaran *{$typeLabel}* Anda *DITOLAK* (tidak valid/buram).\n\nSilakan unggah ulang bukti yang valid.\n\n- SRB Motor";
                  \App\Services\WhatsAppService::sendMessage($phone, $msg);
            }
        } catch (\Exception $e) { \Illuminate\Support\Facades\Log::error('WA Error: ' . $e->getMessage()); }

        return redirect()->back()->with('success', 'Pembayaran cicilan ditolak. User dapat mengupload ulang bukti.');
    }
}
