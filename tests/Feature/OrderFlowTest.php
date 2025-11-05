<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Motor;
use App\Models\Transaction;
use App\Models\CreditDetail;

class OrderFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_cash_order_flow()
    {
        // Create a user
        $user = User::factory()->create();
        
        // Create a motor
        $motor = Motor::factory()->create([
            'price' => 25000000, // 25 million
        ]);
        
        // Test cash order creation
        $response = $this->actingAs($user)
            ->post(route('motors.process-cash-order', $motor->id), [
                'notes' => 'Test cash order',
                'booking_fee' => 2000000, // 2 million
                'payment_method' => 'transfer',
            ]);
            
        // Check that the transaction was created
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'motor_id' => $motor->id,
            'transaction_type' => 'CASH',
            'status' => 'NEW_ORDER',
            'notes' => 'Test cash order',
            'booking_fee' => 2000000,
            'total_amount' => 25000000,
            'payment_method' => 'transfer',
            'payment_status' => 'pending',
        ]);
        
        // Verify redirect to confirmation page
        $transaction = Transaction::where('user_id', $user->id)->first();
        $response->assertRedirect(route('motors.order.confirmation', ['transaction' => $transaction->id]));
    }
    
    public function test_credit_order_flow()
    {
        // Create a user
        $user = User::factory()->create();
        
        // Create a motor
        $motor = Motor::factory()->create([
            'price' => 30000000, // 30 million
        ]);
        
        // Test credit order creation
        $response = $this->actingAs($user)
            ->post(route('motors.process-credit-order', $motor->id), [
                'down_payment' => 5000000, // 5 million
                'tenor' => 36, // 36 months
                'monthly_installment' => 700000, // 700k per month (approx)
                'notes' => 'Test credit order',
                'payment_method' => 'leasing',
            ]);
            
        // Check that the transaction was created
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'motor_id' => $motor->id,
            'transaction_type' => 'CREDIT',
            'status' => 'PENDING_REVIEW',
            'notes' => 'Test credit order',
            'total_amount' => 30000000,
            'payment_method' => 'leasing',
            'payment_status' => 'pending',
        ]);
        
        // Check that the credit details were created
        $this->assertDatabaseHas('credit_details', [
            'down_payment' => 5000000,
            'tenor' => 36,
            'monthly_installment' => 700000,
            'credit_status' => 'PENDING_REVIEW',
        ]);
        
        // Verify redirect to confirmation page
        $transaction = Transaction::where('user_id', $user->id)->first();
        $response->assertRedirect(route('motors.order.confirmation', ['transaction' => $transaction->id]));
    }
}