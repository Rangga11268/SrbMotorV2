<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Motor;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Get popular motors (limit to 5 or 10) with their specifications
        $popularMotors = Motor::with('specifications')->orderBy('created_at', 'desc')->limit(5)->get();

        return view('pages.home', compact('popularMotors'));
    }
}
