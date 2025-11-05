<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Motor;
use App\Models\ContactMessage;

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
        
        $recentMotors = Motor::latest()->limit(5)->get();
        $recentContactMessages = ContactMessage::latest()->limit(5)->get();
        $recentUsers = \App\Models\User::latest()->limit(5)->get();
        
        return view('pages.admin.dashboard', compact(
            'motorsCount', 
            'contactMessagesCount', 
            'usersCount',
            'recentMotors', 
            'recentContactMessages',
            'recentUsers'
        ));
    }
}
