<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Installment;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())
            ->whereHas('creditDetail') // Only get credit transactions
            ->with(['installments' => function ($query) {
                $query->orderBy('installment_number', 'asc');
            }, 'motor'])
            ->whereIn('status', ['disetujui', 'completed', 'APPROVED']) // Only active/approved loans
            ->latest()
            ->get();

        return Inertia::render('Installments/Index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function store(Request $request, Installment $installment)
    {
        $request->validate([
            'payment_proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'payment_method' => 'required|string',
        ]);

        // Verify ownership
        if ($installment->transaction->user_id !== Auth::id()) {
            abort(403);
        }

        if ($request->hasFile('payment_proof')) {
            $path = $request->file('payment_proof')->store('payment_proofs', 'public');
            
            $installment->update([
                'payment_proof' => $path,
                'payment_method' => $request->payment_method,
                'status' => 'waiting_approval',
                'paid_at' => now(),
            ]);

            return redirect()->back()->with('success', 'Bukti pembayaran berhasil diunggah. Menunggu verifikasi admin.');
        }

        return redirect()->back()->with('error', 'Gagal mengunggah bukti pembayaran.');
    }

    /**
     * Approve the installment payment (Admin only).
     */
    public function approve(Installment $installment)
    {
        if ($installment->status !== 'waiting_approval') {
            return redirect()->back()->with('error', 'Cicilan ini tidak dalam status menunggu persetujuan.');
        }

        $installment->update([
            'status' => 'paid',
        ]);

        return redirect()->back()->with('success', 'Pembayaran cicilan berhasil diverifikasi.');
    }
}
