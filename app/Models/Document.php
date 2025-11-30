<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Get the file URL.
     */
    public function getFileUrlAttribute()
    {
        if ($this->file_path) {
            return Storage::disk('cloudinary')->url($this->file_path);
        }
        return '#';
    }

    /**
     * Delete the file when the document is deleted
     */
    protected static function booted()
    {
        static::deleting(function ($document) {
            if ($document->file_path) {
                Storage::disk('cloudinary')->delete($document->file_path);
            }
        });
    }
}
