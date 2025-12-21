<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\MotorSpecification;
use App\Repositories\MotorRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class MotorController extends Controller
{
    private MotorRepositoryInterface $motorRepository;

    public function __construct(MotorRepositoryInterface $motorRepository)
    {
        $this->motorRepository = $motorRepository;
    }


    public function index(): \Inertia\Response
    {
        $filters = [];
        if (request('search')) {
            $filters['search'] = request('search');
        }
        if (request('tersedia') !== null) {
            $filters['tersedia'] = request('tersedia');
        }

        $motors = $this->motorRepository->getWithFilters($filters, true, 10);

        return \Inertia\Inertia::render('Admin/Motors/Index', [
            'motors' => $motors,
            'filters' => request()->all(['search', 'tersedia']),
        ]);
    }


    public function create(): \Inertia\Response
    {
        return \Inertia\Inertia::render('Admin/Motors/Create');
    }


    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|in:Yamaha,Honda',
            'model' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'type' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
            'specifications' => 'nullable|array',
            'specifications.engine_type' => 'nullable|string|max:255',
            'specifications.engine_size' => 'nullable|string|max:255',
            'specifications.fuel_system' => 'nullable|string|max:255',
            'specifications.transmission' => 'nullable|string|max:255',
            'specifications.max_power' => 'nullable|string|max:255',
            'specifications.max_torque' => 'nullable|string|max:255',
            'specifications.additional_specs' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'details' => 'nullable|string',
        ]);

        $imagePath = $request->file('image')->store('motors', 'public');

        $motor = Motor::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'model' => $request->model,
            'price' => $request->price,
            'year' => $request->year,
            'type' => $request->type,
            'tersedia' => $request->tersedia,
            'image_path' => $imagePath,
            'details' => $request->details,
        ]);


        $specifications = $request->input('specifications', []);
        if (!empty($specifications)) {
            foreach ($specifications as $key => $value) {
                if (!empty($value) && trim($value) !== '') {
                    $motor->specifications()->create([
                        'spec_key' => $key,
                        'spec_value' => $value,
                    ]);
                }
            }
        }


        $this->motorRepository->clearCache();

        return redirect()->route('admin.motors.index')->with('success', 'Motor berhasil ditambahkan.');
    }


    public function show(Motor $motor): \Inertia\Response
    {
        $motor->load('specifications');
        return \Inertia\Inertia::render('Admin/Motors/Show', compact('motor'));
    }


    public function edit(Motor $motor): \Inertia\Response
    {
        $motor->load('specifications');
        return \Inertia\Inertia::render('Admin/Motors/Edit', compact('motor'));
    }


    public function update(Request $request, Motor $motor): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|in:Yamaha,Honda',
            'model' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'type' => 'nullable|string|max:255',
            'tersedia' => 'required|boolean',
            'specifications' => 'nullable|array',
            'specifications.engine_type' => 'nullable|string|max:255',
            'specifications.engine_size' => 'nullable|string|max:255',
            'specifications.fuel_system' => 'nullable|string|max:255',
            'specifications.transmission' => 'nullable|string|max:255',
            'specifications.max_power' => 'nullable|string|max:255',
            'specifications.max_torque' => 'nullable|string|max:255',
            'specifications.additional_specs' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'details' => 'nullable|string',
        ]);

        $data = [
            'name' => $request->name,
            'brand' => $request->brand,
            'model' => $request->model,
            'price' => $request->price,
            'year' => $request->year,
            'type' => $request->type,
            'tersedia' => $request->tersedia,
            'details' => $request->details,
        ];


        if ($request->hasFile('image')) {

            if ($motor->image_path) {
                Storage::disk('public')->delete($motor->image_path);
            }
            $data['image_path'] = $request->file('image')->store('motors', 'public');
        }

        $motor->update($data);


        $newSpecs = $request->input('specifications', []);


        $motor->specifications()->delete();


        if (!empty($newSpecs)) {
            foreach ($newSpecs as $key => $value) {
                if (!empty($value) && trim($value) !== '') {
                    $motor->specifications()->create([
                        'spec_key' => $key,
                        'spec_value' => $value,
                    ]);
                }
            }
        }


        $this->motorRepository->clearCache();

        return redirect()->route('admin.motors.index')->with('success', 'Motor berhasil diperbarui.');
    }


    public function destroy(Motor $motor): RedirectResponse
    {

        if ($motor->image_path) {
            Storage::disk('public')->delete($motor->image_path);
        }

        $motor->delete();


        $this->motorRepository->clearCache();

        return redirect()->route('admin.motors.index')->with('success', 'Motor berhasil dihapus.');
    }
}
