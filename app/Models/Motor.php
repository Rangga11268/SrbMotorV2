<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
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
}
