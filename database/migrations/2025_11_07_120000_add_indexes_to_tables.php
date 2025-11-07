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
        // Add indexes to motors table
        Schema::table('motors', function (Blueprint $table) {
            $table->index(['brand', 'type']);
            $table->index('year');
            $table->index('price');
            $table->index('tersedia');
            $table->index(['brand', 'tersedia']);
        });
        
        // Add indexes to motor_specifications table (already has index on motor_id, spec_key)
        Schema::table('motor_specifications', function (Blueprint $table) {
            $table->index('spec_key');
        });
        
        // Add indexes to transactions table
        Schema::table('transactions', function (Blueprint $table) {
            $table->index(['user_id', 'status']);
            $table->index(['motor_id', 'transaction_type']);
            $table->index('transaction_type');
            $table->index('status');
            $table->index('created_at');
        });
        
        // Add indexes to users table
        Schema::table('users', function (Blueprint $table) {
            $table->index('role');
            $table->index('email');
            $table->index('created_at');
        });
        
        // Add indexes to contact_messages table
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->index('created_at');
        });
        
        // Add indexes to credit_details table
        Schema::table('credit_details', function (Blueprint $table) {
            $table->index('credit_status');
        });
        
        // Add indexes to documents table
        Schema::table('documents', function (Blueprint $table) {
            $table->index('document_type');
            $table->index('credit_detail_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('motors', function (Blueprint $table) {
            $table->dropIndex(['brand', 'type']); // drops motors_brand_type_index
            $table->dropIndex(['year']); // drops motors_year_index
            $table->dropIndex(['price']); // drops motors_price_index
            $table->dropIndex(['tersedia']); // drops motors_tersedia_index
            $table->dropIndex(['brand', 'tersedia']); // drops motors_brand_tersedia_index
        });
        
        Schema::table('motor_specifications', function (Blueprint $table) {
            $table->dropIndex(['spec_key']); // drops motor_specifications_spec_key_index
        });
        
        Schema::table('transactions', function (Blueprint $table) {
            // Only drop non-foreign-key indexes
            $table->dropIndex(['transaction_type']); // drops transactions_transaction_type_index
            $table->dropIndex(['status']); // drops transactions_status_index
            $table->dropIndex(['created_at']); // drops transactions_created_at_index
        });
        
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']); // drops users_role_index
            $table->dropIndex(['email']); // drops users_email_index
            $table->dropIndex(['created_at']); // drops users_created_at_index
        });
        
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex(['created_at']); // drops contact_messages_created_at_index
        });
        
        Schema::table('credit_details', function (Blueprint $table) {
            $table->dropIndex(['credit_status']); // drops credit_details_credit_status_index
        });
        
        Schema::table('documents', function (Blueprint $table) {
            $table->dropIndex(['document_type']); // drops documents_document_type_index
        });
    }
};