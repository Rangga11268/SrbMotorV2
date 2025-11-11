<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\CreditDetail;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\View\View;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    /**
     * Generate an invoice for a specific transaction.
     */
    public function generate(Transaction $transaction): Response
    {
        $transaction->load(['user', 'motor', 'motor.specifications', 'creditDetail', 'creditDetail.documents']);

        // Generate the PDF
        $pdf = Pdf::loadView('pages.admin.invoices.invoice', [
            'transaction' => $transaction,
            'logo_path' => public_path('images/icon/logo trans.png')
        ]);

        // Set the filename with a prefix and the transaction ID
        $filename = 'invoice-' . $transaction->id . '.pdf';

        // Return the PDF download response
        return $pdf->download($filename);
    }

    /**
     * Show the invoice preview in the browser.
     */
    public function preview(Transaction $transaction): View
    {
        $transaction->load(['user', 'motor', 'motor.specifications', 'creditDetail', 'creditDetail.documents']);

        return view('pages.admin.invoices.invoice', [
            'transaction' => $transaction,
            'logo_path' => asset('images/icon/logo trans.png')
        ]);
    }
}
