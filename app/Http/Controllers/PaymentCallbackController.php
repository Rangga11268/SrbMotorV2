<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Installment;
use App\Models\Transaction;
use Midtrans\Config;
use Midtrans\Notification;

class PaymentCallbackController extends Controller
{
    public function handle(Request $request)
    {
        // Set configuration
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        try {
            $notification = new Notification();

            $status = $notification->transaction_status;
            $type = $notification->payment_type;
            $fraud = $notification->fraud_status;
            $orderId = $notification->order_id;
            
            // Order ID format: INST-{id}-{timestamp}
            $installmentId = explode('-', $orderId)[1];
            
            $installment = Installment::find($installmentId);

            if (!$installment) {
                return response()->json(['message' => 'Installment not found'], 404);
            }

            if ($status == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        $installment->update(['status' => 'waiting_approval']);
                    } else {
                        $installment->update(['status' => 'paid', 'paid_at' => now(), 'payment_method' => 'midtrans_' . $type]);
                        $this->sendSuccessNotification($installment);
                    }
                }
            } else if ($status == 'settlement') {
                // Determine specific payment method
                $methodStr = 'midtrans_' . $type;
                
                // Check for VA (Bank Transfer)
                if ($type == 'bank_transfer' && isset($notification->va_numbers)) {
                    $bank = $notification->va_numbers[0]->bank ?? 'other';
                    $methodStr = 'midtrans_' . $bank . '_va';
                }
                // Check for E-Wallet (GoPay is usually 'gopay', ShopeePay is 'shopeepay')
                else if ($type == 'gopay' || $type == 'shopeepay') {
                    $methodStr = 'midtrans_' . $type;
                }
                // Check for Cstore
                else if ($type == 'cstore') {
                    $store = $notification->store ?? 'store';
                    $methodStr = 'midtrans_' . $store;
                }

                $installment->update(['status' => 'paid', 'paid_at' => now(), 'payment_method' => $methodStr]);
                $this->sendSuccessNotification($installment);
            }
            
            // Check if all installments are paid for the transaction
            $transaction = $installment->transaction;
            if ($transaction) {
                $unpaid = $transaction->installments()->where('status', '!=', 'paid')->count();
                if ($unpaid == 0) {
                if ($unpaid == 0) {
                    // For CASH transactions, set to 'payment_confirmed' so admin knows to process delivery
                    if ($transaction->transaction_type == 'CASH') {
                        $transaction->update(['status' => 'payment_confirmed']);
                    } else {
                        // For CREDIT, 'completed' means loan is fully paid
                        $transaction->update(['status' => 'completed']);
                    }
                }
            }

            return response()->json(['message' => 'Payment status updated']);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Error processing notification', 'error' => $e->getMessage()], 500);
        }
    }

    private function sendSuccessNotification($installment)
    {
        $user = $installment->transaction->user;
        $motorName = $installment->transaction->motor->name;
        $amount = number_format($installment->amount, 0, ',', '.');
        $date = now()->format('d F Y H:i');

        // Determine payment type label
        if ($installment->installment_number == 0) {
            $typeLabel = $installment->transaction->transaction_type === 'CASH' ? 'Booking Fee' : 'Uang Muka (DP)';
        } else {
            $typeLabel = "Cicilan ke-{$installment->installment_number}";
        }

        $message = "Halo {$user->name},\n\n"
            . "Pembayaran *{$typeLabel}* untuk unit {$motorName} sebesar Rp {$amount} telah kami terima pada {$date}.\n\n"
            . "Status: LUNAS\n"
            . "Terima kasih telah melakukan pembayaran tepat waktu.\n\n"
            . "- SRB Motor System";
            
        // Use customer_phone from transaction as it is more reliable
        $phone = $installment->transaction->customer_phone ?? $user->phone;

        if (!empty($phone)) {
            try {
                \App\Services\WhatsAppService::sendMessage($phone, $message);
            } catch (\Exception $e) {
                // Ignore notification errors to ensure payment status is recorded
                Log::error('Payment Notification Error: ' . $e->getMessage());
            }
        }
    }
}
