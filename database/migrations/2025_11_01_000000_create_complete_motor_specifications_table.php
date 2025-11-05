<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create the motor_specifications table
        Schema::create('motor_specifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('motor_id')->constrained('motors')->onDelete('cascade');
            $table->string('spec_key');
            $table->text('spec_value')->nullable();
            $table->timestamps();
            
            // Add index for better performance
            $table->index(['motor_id', 'spec_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the motor_specifications table
        Schema::dropIfExists('motor_specifications');
    }
};