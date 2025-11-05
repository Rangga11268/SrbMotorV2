<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('motor_id')->constrained()->onDelete('cascade');
            $table->enum('transaction_type', ['CASH', 'CREDIT']);
            $table->enum('status', [
                'NEW_ORDER', 
                'WAITING_PAYMENT', 
                'PAYMENT_CONFIRMED', 
                'UNIT_PREPARATION', 
                'READY_FOR_DELIVERY', 
                'COMPLETED',
                'PENDING_REVIEW',
                'DATA_INVALID',
                'SUBMITTED_TO_SURVEYOR',
                'SURVEY_SCHEDULED',
                'APPROVED',
                'REJECTED'
            ])->default('NEW_ORDER');
            $table->text('notes')->nullable();
            $table->decimal('booking_fee', 10, 2)->nullable(); // For cash transactions
            $table->decimal('total_amount', 10, 2);
            $table->string('payment_method')->nullable();
            $table->enum('payment_status', ['pending', 'confirmed', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};