<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'motor_id',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_address',
        'order_status',
        'order_notes',
        'total_amount',
        'payment_method',
        'payment_status',
        'delivery_option',
        'delivery_address',
        'admin_notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_amount' => 'decimal:2',
        'order_status' => 'string',
        'payment_status' => 'string',
        'delivery_option' => 'string',
        'payment_method' => 'string',
    ];

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the motor that is being ordered.
     */
    public function motor()
    {
        return $this->belongsTo(Motor::class);
    }
}