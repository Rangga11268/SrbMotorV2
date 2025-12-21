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


    public function __invoke(Request $request)
    {

        $popularMotors = $this->motorRepository->getPopular(5, true);

        return \Inertia\Inertia::render('Home', compact('popularMotors'));
    }
}
