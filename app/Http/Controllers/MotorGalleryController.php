<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\Request;
use Illuminate\View\View;

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
}