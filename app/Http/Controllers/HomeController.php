<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\MotorRepositoryInterface;

class HomeController extends Controller
{
    private MotorRepositoryInterface $motorRepository;

    public function __construct(MotorRepositoryInterface $motorRepository)
    {
        $this->motorRepository = $motorRepository;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // Get popular motors (limit to 5 or 10) with their specifications using caching
        $popularMotors = $this->motorRepository->getPopular(5, true);

        return view('pages.home', compact('popularMotors'));
    }
}
