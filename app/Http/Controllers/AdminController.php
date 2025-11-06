<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Motor;
use App\Models\ContactMessage;
use App\Models\Transaction;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $motorsCount = Motor::count();
        $contactMessagesCount = ContactMessage::count();
        $usersCount = \App\Models\User::count();
        $transactionsCount = Transaction::count();
        
        // Transaction counts by type
        $cashTransactionsCount = Transaction::where('transaction_type', 'CASH')->count();
        $creditTransactionsCount = Transaction::where('transaction_type', 'CREDIT')->count();
        
        // Recent transactions
        $recentTransactions = Transaction::with(['user', 'motor'])->latest()->limit(5)->get();
        
        $recentMotors = Motor::latest()->limit(5)->get();
        $recentContactMessages = ContactMessage::latest()->limit(5)->get();
        $recentUsers = \App\Models\User::latest()->limit(5)->get();
        
        return view('pages.admin.dashboard', compact(
            'motorsCount', 
            'contactMessagesCount', 
            'usersCount',
            'transactionsCount',
            'cashTransactionsCount',
            'creditTransactionsCount',
            'recentTransactions',
            'recentMotors', 
            'recentContactMessages',
            'recentUsers'
        ));
    }
}
