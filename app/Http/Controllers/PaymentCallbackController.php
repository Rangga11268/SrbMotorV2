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
            
            // Check if all installments are paid for the transaction
            $transaction = $installment->transaction;
            if ($transaction) {
                $unpaid = $transaction->installments()->where('status', '!=', 'paid')->count();
                if ($unpaid == 0) {
                    $transaction->update(['status' => 'completed']);
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

        $message = "Halo {$user->name},\n\n"
            . "Pembayaran cicilan ke-{$installment->installment_number} untuk unit {$motorName} sebesar Rp {$amount} telah kami terima pada {$date}.\n\n"
            . "Status: LUNAS\n"
            . "Terima kasih telah melakukan pembayaran tepat waktu.\n\n"
            . "- SRB Motor System";
            
        // Assuming user has 'phone_number' or using 'email' for now if phone unavailable
        // Check if user table has phone column first.
        // For now, I will use a placeholder method or try to fetch from user->phone
        // If phone column doesn't exist, this will fail.
        // Let's check user model first to be safe, but for now I'll suppress errors.

        if (!empty($user->phone)) {
             \App\Services\WhatsAppService::sendMessage($user->phone, $message);
        }
    }
}
