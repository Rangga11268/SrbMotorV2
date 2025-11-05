<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\Transaction;
use App\Models\CreditDetail;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class MotorGalleryController extends Controller
{
    /**
     * Display a listing of the motors with filtering and search capabilities.
     */
    public function index(Request $request): View
    {
        // Build the query
        $query = Motor::with('specifications')->orderBy('created_at', 'desc');
        
        // Apply search filter
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('model', 'like', '%' . $search . '%')
                  ->orWhere('brand', 'like', '%' . $search . '%')
                  ->orWhere('type', 'like', '%' . $search . '%')
                  ->orWhere('details', 'like', '%' . $search . '%');
            });
        }
        
        // Apply brand filter
        if ($request->has('brand') && !empty($request->brand)) {
            $query->where('brand', $request->brand);
        }
        
        // Apply type filter
        if ($request->has('type') && !empty($request->type)) {
            $query->where('type', $request->type);
        }
        
        // Apply year filter
        if ($request->has('year') && !empty($request->year)) {
            $query->where('year', $request->year);
        }
        
        // Apply price range filter
        if ($request->has('min_price') && !empty($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }
        
        if ($request->has('max_price') && !empty($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }
        
        // Get all unique brands for the filter dropdown
        $brands = Motor::select('brand')->distinct()->pluck('brand');
        
        // Get all unique types for the filter dropdown
        $types = Motor::select('type')->distinct()->whereNotNull('type')->pluck('type');
        
        // Get all unique years for the filter dropdown (in descending order)
        $years = Motor::select('year')->distinct()->whereNotNull('year')->orderBy('year', 'desc')->pluck('year');
        
        // Paginate the results
        $motors = $query->paginate(12)->appends($request->query());
        
        return view('pages.motors.index', compact('motors', 'brands', 'types', 'years'));
    }

    /**
     * Display the specified motor.
     */
    public function show(Motor $motor): View
    {
        $motor->load('specifications');
        
        // Get related motors (same brand, different model, limit 4)
        $relatedMotors = Motor::where('brand', $motor->brand)
            ->where('id', '!=', $motor->id)
            ->with('specifications')
            ->limit(4)
            ->get();

        return view('pages.motors.show', compact('motor', 'relatedMotors'));
    }

    /**
     * Show the credit calculation page for a specific motor.
     */
    public function showCreditCalculation(Motor $motor): View
    {
        return view('pages.motors.credit_calculation', compact('motor'));
    }
    
    /**
     * Show the cash order form for a specific motor.
     */
    public function showCashOrderForm(Motor $motor): View
    {
        return view('pages.motors.cash_order_form', compact('motor'));
    }
    
    /**
     * Process the cash order for a specific motor.
     */
    public function processCashOrder(Request $request, Motor $motor): RedirectResponse
    {
        $request->validate([
            'notes' => 'nullable|string',
            'booking_fee' => 'nullable|numeric|min:0',
            'payment_method' => 'required|string',
        ]);
        
        // Create the transaction
        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'motor_id' => $motor->id,
            'transaction_type' => 'CASH',
            'status' => 'new_order',
            'notes' => $request->notes ?? '',
            'booking_fee' => $request->booking_fee ?? 0,
            'total_amount' => $motor->price,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
        ]);
        
        return redirect()->route('motors.order.confirmation', ['transaction' => $transaction->id])
            ->with('success', 'Pesanan tunai Anda telah dibuat. Silakan lanjutkan ke halaman konfirmasi.');
    }
    
    /**
     * Show the credit order form for a specific motor.
     */
    public function showCreditOrderForm(Motor $motor): View
    {
        return view('pages.motors.credit_order_form', compact('motor'));
    }
    
    /**
     * Process the credit order for a specific motor.
     */
    public function processCreditOrder(Request $request, Motor $motor): RedirectResponse
    {
        $request->validate([
            'down_payment' => 'required|numeric|min:0',
            'tenor' => 'required|integer|min:1',
            'monthly_installment' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'payment_method' => 'required|string',
        ]);
        
        // Create the transaction
        $transaction = Transaction::create([
            'user_id' => Auth::id(),
            'motor_id' => $motor->id,
            'transaction_type' => 'CREDIT',
            'status' => 'menunggu_persetujuan',
            'notes' => $request->notes ?? '',
            'total_amount' => $motor->price,
            'payment_method' => $request->payment_method,
            'payment_status' => 'pending',
        ]);
        
        // Create credit details
        CreditDetail::create([
            'transaction_id' => $transaction->id,
            'down_payment' => $request->down_payment,
            'tenor' => $request->tenor,
            'monthly_installment' => $request->monthly_installment,
            'credit_status' => 'menunggu_persetujuan', // Initially pending but waiting for documents
        ]);
        
        return redirect()->route('motors.upload-credit-documents', ['transaction' => $transaction->id])
            ->with('success', 'Pengajuan kredit berhasil dibuat. Silakan lengkapi dokumen untuk melanjutkan proses.');
    }
    
    /**
     * Show order confirmation page.
     */
    public function showOrderConfirmation($transactionId): View
    {
        $transaction = Transaction::with(['motor', 'creditDetail'])->findOrFail($transactionId);
        
        // Ensure the transaction belongs to the current user
        if ($transaction->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403, 'Unauthorized access to this transaction');
        }
        
        return view('pages.motors.order_confirmation', compact('transaction'));
    }
    
    /**
     * Show the document upload form for credit transactions.
     */
    public function showUploadCreditDocuments($transactionId)
    {
        $transaction = Transaction::with(['motor', 'creditDetail'])->findOrFail($transactionId);
        
        // Ensure the transaction belongs to the current user and is a credit transaction
        if ($transaction->user_id !== Auth::id() || $transaction->transaction_type !== 'CREDIT') {
            abort(403, 'Unauthorized access to this transaction');
        }
        
        return view('pages.motors.upload_credit_documents', compact('transaction'));
    }
    
    /**
     * Handle document uploads for credit transactions.
     */
    public function uploadCreditDocuments(Request $request, $transactionId)
    {
        $transaction = Transaction::with(['creditDetail'])->findOrFail($transactionId);
        
        // Ensure the transaction belongs to the current user and is a credit transaction
        if ($transaction->user_id !== Auth::id() || $transaction->transaction_type !== 'CREDIT') {
            abort(403, 'Unauthorized access to this transaction');
        }
        
        $request->validate([
            'documents.KTP' => 'required|array|min:1',
            'documents.KTP.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048', // Max 2MB per file
            'documents.KK' => 'required|array|min:1',
            'documents.KK.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'documents.SLIP_GAJI' => 'required|array|min:1',
            'documents.SLIP_GAJI.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'documents.LAINNYA' => 'nullable|array',
            'documents.LAINNYA.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);
        
        // Process and save documents
        foreach ($request->file('documents', []) as $docType => $files) {
            if (is_array($files)) {
                foreach ($files as $file) {
                    if ($file) {
                        // Store file in storage
                        $path = $file->store('credit-documents/' . $transaction->id, 'public');
                        
                        // Create document record
                        Document::create([
                            'credit_detail_id' => $transaction->creditDetail->id,
                            'document_type' => $docType,
                            'file_path' => $path,
                            'original_name' => $file->getClientOriginalName(),
                        ]);
                    }
                }
            }
        }
        
        // Update transaction status to indicate documents have been submitted and are pending admin review
        $transaction->update(['status' => 'menunggu_persetujuan']);
        if ($transaction->creditDetail) {
            $transaction->creditDetail->update(['credit_status' => 'menunggu_persetujuan']);
        }
        
        return redirect()->route('motors.order.confirmation', ['transaction' => $transaction->id])
            ->with('success', 'Dokumen berhasil diunggah. Pengajuan kredit Anda sedang dalam proses review.');
    }
    
    /**
     * Show document management page for a credit transaction.
     */
    public function showDocumentManagement($transactionId)
    {
        $transaction = Transaction::with(['motor', 'creditDetail', 'creditDetail.documents'])->findOrFail($transactionId);
        
        // Ensure the transaction belongs to the current user and is a credit transaction
        if ($transaction->user_id !== Auth::id() || $transaction->transaction_type !== 'CREDIT') {
            abort(403, 'Unauthorized access to this transaction');
        }
        
        return view('pages.motors.document_management', compact('transaction'));
    }
    
    /**
     * Update documents for a credit transaction.
     */
    public function updateDocuments(Request $request, $transactionId)
    {
        $transaction = Transaction::with(['creditDetail'])->findOrFail($transactionId);
        
        // Ensure the transaction belongs to the current user and is a credit transaction
        if ($transaction->user_id !== Auth::id() || $transaction->transaction_type !== 'CREDIT') {
            abort(403, 'Unauthorized access to this transaction');
        }
        
        // Verify that the transaction has a credit detail
        if (!$transaction->creditDetail) {
            return redirect()->back()->withErrors(['error' => 'Transaksi tidak memiliki detail kredit yang valid.']);
        }
        
        $request->validate([
            'documents.KTP' => 'nullable|array',
            'documents.KTP.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'documents.KK' => 'nullable|array',
            'documents.KK.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'documents.SLIP_GAJI' => 'nullable|array',
            'documents.SLIP_GAJI.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'documents.LAINNYA' => 'nullable|array',
            'documents.LAINNYA.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);
        
        // Process and save new documents
        $documents = $request->file('documents');
        if ($documents) {
            foreach ($documents as $docType => $files) {
                if (is_array($files)) {
                    foreach ($files as $file) {
                        if ($file) {
                            // Store file in storage
                            $path = $file->store('credit-documents/' . $transaction->id, 'public');
                            
                            // Create document record
                            Document::create([
                                'credit_detail_id' => $transaction->creditDetail->id,
                                'document_type' => $docType,
                                'file_path' => $path,
                                'original_name' => $file->getClientOriginalName(),
                            ]);
                        }
                    }
                }
            }
        }
        
        // Update transaction status to indicate documents have been updated
        $transaction->update(['status' => 'menunggu_persetujuan']);
        if ($transaction->creditDetail) {
            $transaction->creditDetail->update(['credit_status' => 'menunggu_persetujuan']);
        }
        
        return redirect()->route('motors.order.confirmation', ['transaction' => $transaction->id])
            ->with('success', 'Dokumen berhasil diperbarui. Pengajuan kredit Anda sedang dalam proses review.');
    }
    
    /**
     * Show the user's transactions.
     */
    public function showUserTransactions()
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            abort(403, 'Anda harus login terlebih dahulu untuk mengakses halaman ini.');
        }
        
        $transactions = Transaction::with(['motor', 'creditDetail'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(9);

        return view('pages.motors.user_transactions', compact('transactions'));
    }
}