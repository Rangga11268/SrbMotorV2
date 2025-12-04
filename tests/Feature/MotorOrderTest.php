<?php

namespace Tests\Feature;

use App\Models\Motor;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MotorOrderTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test cash order form can be rendered.
     */
    public function test_cash_order_form_can_be_rendered()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create();

        $response = $this->actingAs($user)->get(route('motors.cash-order', $motor));

        $response->assertStatus(200);
        $response->assertViewIs('pages.motors.cash_order_form');
        $response->assertViewHas('motor', $motor);
    }

    /**
     * Test cash order validation errors.
     */
    public function test_cash_order_validation_errors()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create();

        $response = $this->actingAs($user)->from(route('motors.cash-order', $motor))
            ->post(route('motors.process-cash-order', $motor), [
                'customer_name' => '',
                'customer_phone' => '',
                'customer_occupation' => '',
                'payment_method' => '',
            ]);

        $response->assertRedirect(route('motors.cash-order', $motor));
        $response->assertSessionHasErrors(['customer_name', 'customer_phone', 'customer_occupation', 'payment_method']);
    }

    /**
     * Test user can submit cash order.
     */
    public function test_user_can_submit_cash_order()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create(['price' => 15000000]);

        $response = $this->actingAs($user)->post(route('motors.process-cash-order', $motor), [
            'customer_name' => 'John Doe',
            'customer_phone' => '081234567890',
            'customer_occupation' => 'Employee',
            'notes' => 'Test order',
            'payment_method' => 'transfer',
        ]);

        $transaction = Transaction::where('user_id', $user->id)->where('motor_id', $motor->id)->first();

        $response->assertRedirect(route('motors.order.confirmation', $transaction));
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'motor_id' => $motor->id,
            'transaction_type' => 'CASH',
            'total_amount' => 15000000,
            'customer_name' => 'John Doe',
        ]);
    }

    /**
     * Test credit order form can be rendered.
     */
    public function test_credit_order_form_can_be_rendered()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create();

        $response = $this->actingAs($user)->get(route('motors.credit-order', $motor));

        $response->assertStatus(200);
        $response->assertViewIs('pages.motors.credit_order_form');
        $response->assertViewHas('motor', $motor);
    }

    /**
     * Test credit order validation errors.
     */
    public function test_credit_order_validation_errors()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create();

        $response = $this->actingAs($user)->from(route('motors.credit-order', $motor))
            ->post(route('motors.process-credit-order', $motor), [
                'customer_name' => '',
                'down_payment' => '',
                'tenor' => '',
            ]);

        $response->assertRedirect(route('motors.credit-order', $motor));
        $response->assertSessionHasErrors(['customer_name', 'down_payment', 'tenor']);
    }

    /**
     * Test credit order down payment validation (cannot exceed price).
     */
    public function test_credit_order_down_payment_validation()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create(['price' => 15000000]);

        $response = $this->actingAs($user)->from(route('motors.credit-order', $motor))
            ->post(route('motors.process-credit-order', $motor), [
                'customer_name' => 'John Doe',
                'customer_phone' => '081234567890',
                'customer_occupation' => 'Employee',
                'down_payment' => 16000000, // More than price
                'tenor' => 12,
                'payment_method' => 'transfer',
            ]);

        $response->assertRedirect(route('motors.credit-order', $motor));
        $response->assertSessionHasErrors('down_payment');
    }

    /**
     * Test user can submit credit order.
     */
    public function test_user_can_submit_credit_order()
    {
        $user = User::factory()->create();
        $motor = Motor::factory()->create(['price' => 15000000]);

        $response = $this->actingAs($user)->post(route('motors.process-credit-order', $motor), [
            'customer_name' => 'John Doe',
            'customer_phone' => '081234567890',
            'customer_occupation' => 'Employee',
            'down_payment' => 2000000,
            'tenor' => 12,
            'payment_method' => 'transfer',
        ]);

        $transaction = Transaction::where('user_id', $user->id)->where('motor_id', $motor->id)->first();

        $response->assertRedirect(route('motors.upload-credit-documents', $transaction));
        
        $this->assertDatabaseHas('transactions', [
            'user_id' => $user->id,
            'motor_id' => $motor->id,
            'transaction_type' => 'CREDIT',
            'total_amount' => 15000000,
        ]);

        $this->assertDatabaseHas('credit_details', [
            'transaction_id' => $transaction->id,
            'down_payment' => 2000000,
            'tenor' => 12,
        ]);
    }
}
