<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Motor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'brand',
        'model',
        'price',
        'year',
        'type',
        'image_path',
        'details',
        'tersedia',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'tersedia' => 'boolean',
    ];

    /**
     * Get the specifications for the motor.
     */
    public function specifications()
    {
        return $this->hasMany(MotorSpecification::class, 'motor_id');
    }

    /**
     * Get the specifications as an associative array.
     */
    public function getSpecificationsArrayAttribute()
    {
        $specs = $this->specifications;
        $result = [];

        foreach ($specs as $spec) {
            $result[$spec->spec_key] = $spec->spec_value;
        }

        return $result;
    }

    /**
     * Delete the image file when the motor is deleted
     */
    protected static function booted()
    {
        static::deleting(function ($motor) {
            // Delete the motor's image if it exists using the storage system
            if ($motor->image_path) {
                if (str_starts_with($motor->image_path, 'storage/')) {
                    // If the path starts with 'storage/', it's a public disk file
                    Storage::disk('public')->delete(str_replace('storage/', '', $motor->image_path));
                } else {
                    // Otherwise check if it's a public path
                    if (file_exists(public_path($motor->image_path))) {
                        unlink(public_path($motor->image_path));
                    }
                }
            }

            // Delete all associated specifications
            $motor->specifications()->delete();
        });
    }
}
