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
        Schema::create('credit_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->decimal('down_payment', 10, 2);
            $table->integer('tenor'); // in months
            $table->decimal('monthly_installment', 10, 2);
            $table->enum('credit_status', [
                'menunggu_persetujuan',
                'data_tidak_valid',
                'dikirim_ke_surveyor',
                'jadwal_survey',
                'disetujui',
                'ditolak'
            ])->default('menunggu_persetujuan');
            $table->decimal('approved_amount', 10, 2)->nullable();
            $table->timestamps();
            
            // Ensure transaction_id is unique since it's a one-to-one relationship
            $table->unique('transaction_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_details');
    }
};