<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\CreditDetail;
use App\Models\Document;
use App\Models\Motor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\CreditStatusUpdated;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index(Request $request): \Inertia\Response
    {
        $query = Transaction::with(['user', 'motor', 'creditDetail.documents'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                  ->orWhereHas('user', function($u) use ($search) {
                      $u->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('motor', function($m) use ($search) {
                      $m->where('name', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->has('type') && !empty($request->type)) {
            $query->where('transaction_type', $request->type);
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $transactions = $query->paginate(10)->appends($request->query());

        // Transform collection to include documents_complete status
        $transactions->getCollection()->transform(function ($transaction) {
            $transaction->documents_complete = $transaction->transaction_type === 'CREDIT' && $transaction->creditDetail
                ? $transaction->creditDetail->hasRequiredDocuments()
                : true;
            return $transaction;
        });

        // Get unique transaction types and statuses for filter dropdowns
        $transactionTypes = Transaction::distinct('transaction_type')->pluck('transaction_type');
        $statuses = Transaction::distinct('status')->pluck('status');

        return \Inertia\Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions,
            'transactionTypes' => $transactionTypes,
            'statuses' => $statuses,
            'filters' => $request->all(['search', 'type', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(): \Inertia\Response
    {
        return \Inertia\Inertia::render('Admin/Transactions/Create', [
            'users' => User::all(),
            'motors' => Motor::all(),
        ]);
    }

    /**
     * Store a newly created transaction in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'motor_id' => 'required|exists:motors,id',
            'transaction_type' => 'required|in:CASH,CREDIT',
            'status' => 'required',
            'notes' => 'nullable|string',
            'booking_fee' => 'nullable|numeric|min:0|lt:total_amount',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string',
            'payment_status' => 'nullable|in:pending,confirmed,failed',
            'customer_name' => 'nullable|string|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'customer_occupation' => 'nullable|string|max:255',
        ], [
            'booking_fee.lt' => 'Booking fee harus lebih kecil dari total harga.',
        ]);

        $transactionData = $request->only([
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
            'customer_occupation'
        ]);

        $transaction = Transaction::create($transactionData);

        // Handle credit detail if this is a credit transaction
        if ($request->transaction_type === 'CREDIT') {
            $request->validate([
                'credit_detail.down_payment' => 'required|numeric|min:0',
                'credit_detail.tenor' => 'required|integer|min:1',
                'credit_detail.monthly_installment' => 'required|numeric|min:0',
                'credit_detail.credit_status' => 'required|in:menunggu_persetujuan,data_tidak_valid,dikirim_ke_surveyor,jadwal_survey,disetujui,ditolak',
                'credit_detail.approved_amount' => 'nullable|numeric|min:0',
            ]);

            $creditDetailData = $request->input('credit_detail');
            $creditDetailData['transaction_id'] = $transaction->id;
            
            CreditDetail::create($creditDetailData);
        }

        return redirect()->route('admin.transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction): \Inertia\Response
    {
        $transaction->load(['user', 'motor', 'creditDetail', 'creditDetail.documents', 'installments' => function($q) {
            $q->orderBy('installment_number', 'asc');
        }]);
        
        $transaction->documents_complete = $transaction->transaction_type === 'CREDIT' && $transaction->creditDetail
            ? $transaction->creditDetail->hasRequiredDocuments()
            : true;

        return \Inertia\Inertia::render('Admin/Transactions/Show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Show the form for editing the specified transaction.
     */
    public function edit(Transaction $transaction): \Inertia\Response
    {
        $transaction->load(['creditDetail', 'user', 'motor']);
        
        return \Inertia\Inertia::render('Admin/Transactions/Edit', [
            'transaction' => $transaction,
            'users' => User::all(),
            'motors' => Motor::all(),
        ]);
    }

    /**
     * Update the specified transaction in storage.
     */
    public function update(Request $request, Transaction $transaction): RedirectResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'motor_id' => 'required|exists:motors,id',
            'transaction_type' => 'required|in:CASH,CREDIT',
            'status' => 'required',
            'notes' => 'nullable|string',
            'booking_fee' => 'nullable|numeric|min:0|lt:total_amount',
            'total_amount' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string',
            'payment_status' => 'nullable|in:pending,confirmed,failed',
            'customer_name' => 'nullable|string|max:255',
            'customer_phone' => 'nullable|string|regex:/^[\+]?[0-9\s\-\(\)]+$/|max:20',
            'customer_occupation' => 'nullable|string|max:255',
        ]);

        $transactionData = $request->only([
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
            'customer_occupation'
        ]);

        $transaction->update($transactionData);

        // Handle credit detail if this is a credit transaction
        if ($request->transaction_type === 'CREDIT') {
            $request->validate([
                'credit_detail.down_payment' => 'required|numeric|min:0|lt:total_amount',
                'credit_detail.tenor' => 'required|integer|min:1',
                'credit_detail.monthly_installment' => 'required|numeric|min:0',
                'credit_detail.credit_status' => 'required|in:menunggu_persetujuan,data_tidak_valid,dikirim_ke_surveyor,jadwal_survey,disetujui,ditolak',
                'credit_detail.approved_amount' => 'nullable|numeric|min:0|lte:total_amount',
            ], [
                'credit_detail.down_payment.lt' => 'Uang muka harus lebih kecil dari total harga motor.',
                'credit_detail.approved_amount.lte' => 'Jumlah disetujui tidak boleh lebih besar dari total harga motor.',
            ]);

            $creditDetailData = $request->input('credit_detail');
            $creditDetailData['transaction_id'] = $transaction->id;

            if ($transaction->creditDetail) {
                $transaction->creditDetail->update($creditDetailData);
            } else {
                CreditDetail::create($creditDetailData);
            }

            // Generate Installments if Approved
            if ($creditDetailData['credit_status'] === 'disetujui' && $transaction->installments()->count() === 0) {
                // 1. Create Down Payment Installment (Installment 0)
                \App\Models\Installment::create([
                    'transaction_id' => $transaction->id,
                    'installment_number' => 0, // 0 indicates Down Payment
                    'amount' => $creditDetailData['down_payment'],
                    'due_date' => now(), // Due immediately
                    'status' => 'pending',
                ]);

                // 2. Create Monthly Installments
                $amount = $creditDetailData['monthly_installment'];
                $tenor = $creditDetailData['tenor'];
                
                for ($i = 1; $i <= $tenor; $i++) {
                    \App\Models\Installment::create([
                        'transaction_id' => $transaction->id,
                        'installment_number' => $i,
                        'amount' => $amount,
                        'due_date' => now()->addMonths($i),
                        'status' => 'pending',
                    ]);
                }
            }
        } else {
            // Remove credit detail if transaction type changed from credit to cash
            if ($transaction->creditDetail) {
                $transaction->creditDetail->delete();
            }
        }

        // Send email notification for status change
        if ($request->has('status') || ($request->has('credit_detail') && isset($request->credit_detail['credit_status']))) {
             // Reload transaction to get latest data including relationships
             $transaction->refresh();
             if ($transaction->user && $transaction->user->email) {
                 Mail::to($transaction->user)->send(new CreditStatusUpdated($transaction));
             }
        }

        return redirect()->route('admin.transactions.show', $transaction->id)
            ->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified transaction from storage.
     */
    public function destroy(Transaction $transaction): RedirectResponse
    {
        // Delete associated credit details and documents first
        if ($transaction->creditDetail) {
            // Delete associated documents
            if ($transaction->creditDetail->documents) {
                foreach ($transaction->creditDetail->documents as $document) {
                    // Delete the physical file
                    if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
                        Storage::disk('public')->delete($document->file_path);
                    }
                    $document->delete();
                }
            }
            $transaction->creditDetail->delete();
        }

        $transaction->delete();

        return redirect()->route('admin.transactions.index')
            ->with('success', 'Transaction deleted successfully.');
    }

    /**
     * Update the status of the specified transaction.
     */
    public function updateStatus(Request $request, Transaction $transaction): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $transaction->update(['status' => $request->status]);

        // Send email notification
        if ($transaction->user && $transaction->user->email) {
            Mail::to($transaction->user)->send(new CreditStatusUpdated($transaction));
        }

        return redirect()->back()
            ->with('success', 'Transaction status updated successfully.');
    }

    /**
     * Upload a document for the specified transaction.
     */
    public function uploadDocument(Request $request, Transaction $transaction): RedirectResponse
    {
        $request->validate([
            'document_type' => 'required|string|in:KTP,KK,SLIP_GAJI,BPKB,STNK,FAKTUR,LAINNYA',
            'document_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // Max 5MB
        ]);

        // Create credit detail if it doesn't exist
        if (!$transaction->creditDetail) {
            $creditDetail = CreditDetail::create([
                'transaction_id' => $transaction->id,
                'down_payment' => 0,
                'tenor' => 12,
                'monthly_installment' => 0,
                'credit_status' => 'menunggu_persetujuan',
            ]);
        } else {
            $creditDetail = $transaction->creditDetail;
        }

        // Handle file upload
        $file = $request->file('document_file');
        $originalName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();

        // Create a unique filename
        $filename = time() . '_' . uniqid() . '.' . $extension;

        // Store the file in the public storage
        $path = $file->storeAs('documents', $filename, 'public');

        // Create the document record
        Document::create([
            'credit_detail_id' => $creditDetail->id,
            'document_type' => $request->document_type,
            'file_path' => $path,
            'original_name' => $originalName,
        ]);

        return redirect()->back()
            ->with('success', 'Dokumen berhasil diunggah.');
    }

    /**
     * Delete a document.
     */
    public function deleteDocument(Document $document): RedirectResponse
    {
        // Delete the physical file
        // Delete the physical file
        if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        // Delete the document record
        $document->delete();

        return redirect()->back()
            ->with('success', 'Dokumen berhasil dihapus.');
    }
}
