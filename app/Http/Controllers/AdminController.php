<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Motor;
use App\Models\ContactMessage;
use App\Models\Order;

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
        $ordersCount = Order::count();
        $pendingOrdersCount = Order::where('order_status', 'pending')->count();
        
        $recentMotors = Motor::latest()->limit(5)->get();
        $recentContactMessages = ContactMessage::latest()->limit(5)->get();
        $recentUsers = \App\Models\User::latest()->limit(5)->get();
        $recentOrders = Order::with('motor')->latest()->limit(5)->get();
        
        return view('pages.admin.dashboard', compact(
            'motorsCount', 
            'contactMessagesCount', 
            'usersCount',
            'ordersCount',
            'pendingOrdersCount',
            'recentMotors', 
            'recentContactMessages',
            'recentUsers',
            'recentOrders'
        ));
    }
}
