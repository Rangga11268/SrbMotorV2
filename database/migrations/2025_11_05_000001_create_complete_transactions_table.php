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
                'new_order', 
                'waiting_payment', 
                'payment_confirmed', 
                'unit_preparation', 
                'ready_for_delivery', 
                'completed',
                'menunggu_persetujuan',
                'data_tidak_valid',
                'dikirim_ke_surveyor',
                'jadwal_survey',
                'disetujui',
                'ditolak'
            ])->default('new_order');
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