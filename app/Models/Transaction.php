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

    /**
     * Accessor to get the human-readable status text
     */
    public function getStatusTextAttribute()
    {
        $statusMap = [
            'new_order' => 'Pesanan Baru',
            'waiting_payment' => 'Menunggu Pembayaran',
            'payment_confirmed' => 'Pembayaran Dikonfirmasi',
            'unit_preparation' => 'Persiapan Unit',
            'ready_for_delivery' => 'Siap Dikirim',
            'completed' => 'Selesai',
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$this->status] ?? $this->status;
    }

    /**
     * Accessor to get the human-readable credit status text
     */
    public function getCreditStatusTextAttribute()
    {
        if (!$this->creditDetail) {
            return '';
        }
        
        $statusMap = [
            'menunggu_persetujuan' => 'Menunggu Persetujuan',
            'data_tidak_valid' => 'Data Tidak Valid',
            'dikirim_ke_surveyor' => 'Dikirim ke Surveyor',
            'jadwal_survey' => 'Jadwal Survey',
            'disetujui' => 'Disetujui',
            'ditolak' => 'Ditolak',
            'PENDING_REVIEW' => 'Menunggu Persetujuan',
            'DATA_INVALID' => 'Data Tidak Valid',
            'SUBMITTED_TO_SURVEYOR' => 'Dikirim ke Surveyor',
            'SURVEY_SCHEDULED' => 'Jadwal Survey',
            'APPROVED' => 'Disetujui',
            'REJECTED' => 'Ditolak'
        ];
        
        return $statusMap[$this->creditDetail->credit_status] ?? $this->creditDetail->credit_status;
    }
}