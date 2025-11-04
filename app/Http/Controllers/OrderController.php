<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Motor;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the orders for the authenticated user.
     */
    public function index(): View
    {
        $orders = Order::where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(10);
        return view('pages.orders.index', compact('orders'));
    }

    /**
     * Show the form for creating a new order.
     */
    public function create(Motor $motor): View
    {
        return view('pages.orders.create', compact('motor'));
    }

    /**
     * Store a newly created order in storage.
     */
    public function store(Request $request, Motor $motor): RedirectResponse
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_address' => 'nullable|string',
            'order_notes' => 'nullable|string',
            'delivery_option' => 'required|in:pickup,delivery',
            'delivery_address' => 'required_if:delivery_option,delivery|nullable|string',
        ]);

        $order = Order::create([
            'user_id' => Auth::id(),
            'motor_id' => $motor->id,
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'customer_phone' => $request->customer_phone,
            'customer_address' => $request->customer_address,
            'order_status' => 'pending', // Default to pending
            'order_notes' => $request->order_notes,
            'total_amount' => $motor->price,
            'payment_method' => $request->payment_method,
            'payment_status' => 'unpaid', // Default to unpaid
            'delivery_option' => $request->delivery_option,
            'delivery_address' => $request->delivery_option === 'delivery' ? $request->delivery_address : null,
        ]);

        return redirect()->route('orders.index')->with('success', 'Pesanan berhasil dibuat. Admin akan segera memproses pesanan Anda.');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): View
    {
        // Ensure user can only see their own orders (or admin can see any)
        if ($order->user_id !== Auth::id() && !Auth::user()->isAdmin()) {
            abort(403);
        }

        return view('pages.orders.show', compact('order'));
    }

    /**
     * Show the form for editing the specified order (admin only).
     */
    public function edit(Order $order): View
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        return view('pages.admin.orders.edit', compact('order'));
    }

    /**
     * Update the specified order in storage (admin only).
     */
    public function update(Request $request, Order $order): RedirectResponse
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $request->validate([
            'order_status' => 'required|in:pending,confirmed,processing,shipped,delivered,cancelled',
            'payment_status' => 'required|in:unpaid,paid,pending,failed',
            'admin_notes' => 'nullable|string',
        ]);

        $order->update([
            'order_status' => $request->order_status,
            'payment_status' => $request->payment_status,
            'admin_notes' => $request->admin_notes,
        ]);

        return redirect()->route('admin.orders.index')->with('success', 'Pesanan berhasil diperbarui.');
    }

    /**
     * Remove the specified order from storage (admin only).
     */
    public function destroy(Order $order): RedirectResponse
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $order->delete();

        return redirect()->route('admin.orders.index')->with('success', 'Pesanan berhasil dihapus.');
    }

    /**
     * Display a listing of all orders (admin only).
     */
    public function indexAdmin(): View
    {
        if (!Auth::user()->isAdmin()) {
            abort(403);
        }

        $query = Order::with(['user', 'motor']); // Eager load relationships
        
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('customer_name', 'like', '%' . $search . '%')
                  ->orWhere('customer_email', 'like', '%' . $search . '%')
                  ->orWhereHas('motor', function($q) use ($search) {
                      $q->where('name', 'like', '%' . $search . '%');
                  });
            });
        }
        
        $orders = $query->orderBy('created_at', 'desc')->paginate(10);
        
        return view('pages.admin.orders.index', compact('orders'));
    }
}
