<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotorSpecification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'motor_id',
        'spec_key',
        'spec_value',
    ];

    /**
     * Get the motor that owns the specification.
     */
    public function motor()
    {
        return $this->belongsTo(Motor::class);
    }
}