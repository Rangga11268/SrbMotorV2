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
        // Get popular motors (limit to 5 or 10)
        $popularMotors = Motor::orderBy('created_at', 'desc')->limit(5)->get();
        
        // Get Yamaha motors
        $yamahaMotors = Motor::where('brand', 'Yamaha')->get();
        
        // Get Honda motors
        $hondaMotors = Motor::where('brand', 'Honda')->get();

        return view('pages.home', compact('popularMotors', 'yamahaMotors', 'hondaMotors'));
    }
}
