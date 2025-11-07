<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
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
        'transaction_type',
        'status',
        'notes',
        'booking_fee',
        'total_amount',
        'payment_method',
        'payment_status',
        'customer_name',
        'customer_phone',
        'customer_occupation',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booking_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    /**
     * Get the user that owns the transaction.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the motor associated with the transaction.
     */
    public function motor(): BelongsTo
    {
        return $this->belongsTo(Motor::class);
    }

    /**
     * Get the credit details for the transaction (if it's a credit transaction).
     */
    public function creditDetail(): HasOne
    {
        return $this->hasOne(CreditDetail::class);
    }
}