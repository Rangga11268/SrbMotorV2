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
                    }
                }
            } else if ($status == 'settlement') {
                $installment->update(['status' => 'paid', 'paid_at' => now(), 'payment_method' => 'midtrans_' . $type]);
            } else if ($status == 'pending') {
                $installment->update(['status' => 'pending']);
            } else if ($status == 'deny') {
                $installment->update(['status' => 'waiting_approval']); // Or deny?
            } else if ($status == 'expire') {
                $installment->update(['status' => 'overdue']);
            } else if ($status == 'cancel') {
                $installment->update(['status' => 'overdue']);
            }
            
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
}
