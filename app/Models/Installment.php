<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    protected $fillable = [
        'transaction_id',
        'installment_number',
        'amount',
        'due_date',
        'status',
        'paid_at',
        'payment_method',
        'payment_proof',
        'notes',
        'snap_token',
        'midtrans_booking_code',
    ];

    protected $casts = [
        'due_date' => 'date',
        'paid_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
