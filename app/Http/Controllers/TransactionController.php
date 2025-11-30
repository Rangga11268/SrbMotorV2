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

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index(Request $request): View
    {
        $query = Transaction::with(['user', 'motor', 'creditDetail'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if ($request->has('type') && !empty($request->type)) {
            $query->where('transaction_type', $request->type);
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $transactions = $query->paginate(10)->appends($request->query());

        // Get unique transaction types and statuses for filter dropdowns
        $transactionTypes = Transaction::distinct('transaction_type')->pluck('transaction_type');
        $statuses = Transaction::distinct('status')->pluck('status');

        return view('pages.admin.transactions.index', compact('transactions', 'transactionTypes', 'statuses'));
    }

    /**
     * Show the form for creating a new transaction.
     */
    public function create(): View
    {
        $users = User::all();
        $motors = Motor::all();
        return view('pages.admin.transactions.create', compact('users', 'motors'));
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
            'booking_fee' => 'nullable|numeric|min:0',
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

        $transaction = Transaction::create($transactionData);

        return redirect()->route('admin.transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified transaction.
     */
    public function show(Transaction $transaction): View
    {
        $transaction->load(['user', 'motor', 'creditDetail', 'creditDetail.documents']);

        return view('pages.admin.transactions.show', compact('transaction'));
    }

    /**
     * Show the form for editing the specified transaction.
     */
    public function edit(Transaction $transaction): View
    {
        $users = User::all();
        $motors = Motor::all();
        $transaction->load('creditDetail');

        return view('pages.admin.transactions.edit', compact('transaction', 'users', 'motors'));
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
            'booking_fee' => 'nullable|numeric|min:0',
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
                'credit_detail.down_payment' => 'required|numeric|min:0',
                'credit_detail.tenor' => 'required|integer|min:1',
                'credit_detail.monthly_installment' => 'required|numeric|min:0',
                'credit_detail.credit_status' => 'required|in:menunggu_persetujuan,data_tidak_valid,dikirim_ke_surveyor,jadwal_survey,disetujui,ditolak',
                'credit_detail.approved_amount' => 'nullable|numeric|min:0',
            ]);

            $creditDetailData = $request->input('credit_detail');
            $creditDetailData['transaction_id'] = $transaction->id;

            if ($transaction->creditDetail) {
                $transaction->creditDetail->update($creditDetailData);
            } else {
                CreditDetail::create($creditDetailData);
            }
        } else {
            // Remove credit detail if transaction type changed from credit to cash
            if ($transaction->creditDetail) {
                $transaction->creditDetail->delete();
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

        return redirect()->back()
            ->with('success', 'Transaction status updated successfully.');
    }

    /**
     * Upload a document for the specified transaction.
     */
    public function uploadDocument(Request $request, Transaction $transaction): RedirectResponse
    {
        $request->validate([
            'document_type' => 'required|string|in:KTP,KK,SLIP_GAJI,LAINNYA',
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
