<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'credit_detail_id',
        'document_type',
        'file_path',
        'original_name',
    ];

    /**
     * Get the credit detail that owns the document.
     */
    public function creditDetail(): BelongsTo
    {
        return $this->belongsTo(CreditDetail::class);
    }
}