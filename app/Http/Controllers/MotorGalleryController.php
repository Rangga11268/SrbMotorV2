<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\Transaction;
use App\Models\CreditDetail;
use App\Models\Document;
use App\Repositories\MotorRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class MotorGalleryController extends Controller
{
    private MotorRepositoryInterface $motorRepository;

    public function __construct(MotorRepositoryInterface $motorRepository)
    {
        $this->motorRepository = $motorRepository;
    }

    /**
     * Display a listing of the motors with filtering and search capabilities.
     */
    public function index(Request $request): View
    {
        // Prepare filters array
        $filters = [];
        if ($request->has('search') && !empty($request->search)) {
            $filters['search'] = $request->search;
        }
        if ($request->has('brand') && !empty($request->brand)) {
            $filters['brand'] = $request->brand;
        }
        if ($request->has('type') && !empty($request->type)) {
            $filters['type'] = $request->type;
        }
        if ($request->has('year') && !empty($request->year)) {
            $filters['year'] = $request->year;
        }
        if ($request->has('min_price') && !empty($request->min_price)) {
            $filters['min_price'] = $request->min_price;
        }
        if ($request->has('max_price') && !empty($request->max_price)) {
            $filters['max_price'] = $request->max_price;
        }
        
        // Get motors with filters using caching
        $motors = $this->motorRepository->getWithFilters($filters, true, 12);
        
        // Get filter options using caching
        $filterOptions = $this->motorRepository->getFilterOptions($request->get('search'));
        $brands = $filterOptions['brands'];
        $types = $filterOptions['types'];
        $years = $filterOptions['years'];
        
        return view('pages.motors.index', compact('motors', 'brands', 'types', 'years'));
    }

    /**
     * Display the specified motor.
     */
    public function show(Motor $motor): View
    {
        // Get motor using repository (with caching)
        $motor = $this->motorRepository->findById($motor->id, true);
        
        // Get related motors (same brand, different model, limit 4) - this one we'll keep as a direct query
        // since related motors might change frequently and caching could lead to stale data
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
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|regex:/^[\+]?[0-9\s\-\(\)]+$/|max:20',
            'customer_occupation' => 'required|string|max:255',
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
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'customer_occupation' => $request->customer_occupation,
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
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|regex:/^[\+]?[0-9\s\-\(\)]+$/|max:20',
            'customer_occupation' => 'required|string|max:255',
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
            'customer_name' => $request->customer_name,
            'customer_phone' => $request->customer_phone,
            'customer_occupation' => $request->customer_occupation,
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
        ], [
            'documents.KTP.required' => 'File KTP wajib diunggah',
            'documents.KTP.min' => 'Minimal 1 file KTP harus diunggah',
            'documents.KTP.*.file' => 'File KTP harus berupa file yang valid',
            'documents.KTP.*.mimes' => 'File KTP harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.KTP.*.max' => 'Ukuran file KTP tidak boleh lebih dari 2MB',
            'documents.KK.required' => 'File KK wajib diunggah',
            'documents.KK.min' => 'Minimal 1 file KK harus diunggah',
            'documents.KK.*.file' => 'File KK harus berupa file yang valid',
            'documents.KK.*.mimes' => 'File KK harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.KK.*.max' => 'Ukuran file KK tidak boleh lebih dari 2MB',
            'documents.SLIP_GAJI.required' => 'File slip gaji wajib diunggah',
            'documents.SLIP_GAJI.min' => 'Minimal 1 file slip gaji harus diunggah',
            'documents.SLIP_GAJI.*.file' => 'File slip gaji harus berupa file yang valid',
            'documents.SLIP_GAJI.*.mimes' => 'File slip gaji harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.SLIP_GAJI.*.max' => 'Ukuran file slip gaji tidak boleh lebih dari 2MB',
            'documents.LAINNYA.*.file' => 'File tambahan harus berupa file yang valid',
            'documents.LAINNYA.*.mimes' => 'File tambahan harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.LAINNYA.*.max' => 'Ukuran file tambahan tidak boleh lebih dari 2MB',
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
        ], [
            'documents.KTP.*.file' => 'File KTP harus berupa file yang valid',
            'documents.KTP.*.mimes' => 'File KTP harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.KTP.*.max' => 'Ukuran file KTP tidak boleh lebih dari 2MB',
            'documents.KK.*.file' => 'File KK harus berupa file yang valid',
            'documents.KK.*.mimes' => 'File KK harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.KK.*.max' => 'Ukuran file KK tidak boleh lebih dari 2MB',
            'documents.SLIP_GAJI.*.file' => 'File slip gaji harus berupa file yang valid',
            'documents.SLIP_GAJI.*.mimes' => 'File slip gaji harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.SLIP_GAJI.*.max' => 'Ukuran file slip gaji tidak boleh lebih dari 2MB',
            'documents.LAINNYA.*.file' => 'File tambahan harus berupa file yang valid',
            'documents.LAINNYA.*.mimes' => 'File tambahan harus berupa file gambar (jpg, jpeg, png) atau PDF',
            'documents.LAINNYA.*.max' => 'Ukuran file tambahan tidak boleh lebih dari 2MB',
        ]);

        $documentsProcessed = false;

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

                            $documentsProcessed = true;
                        }
                    }
                }
            }
        }

        // Only update status if new documents were actually uploaded
        if ($documentsProcessed) {
            // Update transaction status to indicate documents have been updated
            $transaction->update(['status' => 'menunggu_persetujuan']);
            if ($transaction->creditDetail) {
                $transaction->creditDetail->update(['credit_status' => 'menunggu_persetujuan']);
            }

            return redirect()->route('motors.order.confirmation', ['transaction' => $transaction->id])
                ->with('success', 'Dokumen berhasil diperbarui. Pengajuan kredit Anda sedang dalam proses review.');
        } else {
            return redirect()->route('motors.order.confirmation', ['transaction' => $transaction->id])
                ->with('info', 'Tidak ada dokumen baru yang diunggah.');
        }
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