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
        
        // Migrate existing specifications from the motors table to the new table
        // This runs after the table is created
        $motors = DB::table('motors')->select('id', 'specifications')->get();
        foreach ($motors as $motor) {
            if ($motor->specifications) {
                $specs = is_string($motor->specifications) ? json_decode($motor->specifications, true) : $motor->specifications;
                if (is_array($specs)) {
                    foreach ($specs as $key => $value) {
                        if (!empty($key) && $value !== null) {
                            DB::table('motor_specifications')->insert([
                                'motor_id' => $motor->id,
                                'spec_key' => $key,
                                'spec_value' => $value,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }
        }
        
        // Remove the specifications column from the motors table
        Schema::table('motors', function (Blueprint $table) {
            $table->dropColumn('specifications');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back the specifications column to motors table
        Schema::table('motors', function (Blueprint $table) {
            $table->text('specifications')->nullable();
        });
        
        // Restore the specifications data from motor_specifications to motors
        $specifications = DB::table('motor_specifications')
            ->select('motor_id', 'spec_key', 'spec_value')
            ->get();
        
        foreach ($specifications as $spec) {
            $motor = DB::table('motors')->where('id', $spec->motor_id)->first();
            if ($motor) {
                $specs = $motor->specifications ? json_decode($motor->specifications, true) : [];
                $specs[$spec->spec_key] = $spec->spec_value;
                
                DB::table('motors')
                    ->where('id', $spec->motor_id)
                    ->update(['specifications' => json_encode($specs)]);
            }
        }
        
        // Drop the motor_specifications table
        Schema::dropIfExists('motor_specifications');
    }
};