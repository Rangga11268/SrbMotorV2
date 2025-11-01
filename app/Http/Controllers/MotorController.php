<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\MotorSpecification;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class MotorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $query = Motor::with('specifications'); // Eager load specifications
        
        if (request('search')) {
            $search = request('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('model', 'like', '%' . $search . '%')
                  ->orWhere('brand', 'like', '%' . $search . '%')
                  ->orWhere('type', 'like', '%' . $search . '%');
            });
        }
        
        $motors = $query->orderBy('created_at', 'desc')->paginate(10);
        
        return view('pages.admin.motors.index', compact('motors'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('pages.admin.motors.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|in:Yamaha,Honda',
            'model' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'type' => 'nullable|string|max:255',
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
            'image_path' => $imagePath,
            'details' => $request->details,
        ]);

        // Save specifications to the separate table
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

        return redirect()->route('admin.motors.index')->with('success', 'Motor created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Motor $motor): View
    {
        $motor->load('specifications'); // Load specifications
        return view('pages.admin.motors.show', compact('motor'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Motor $motor): View
    {
        $motor->load('specifications'); // Load specifications
        return view('pages.admin.motors.edit', compact('motor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Motor $motor): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'required|string|in:Yamaha,Honda',
            'model' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'type' => 'nullable|string|max:255',
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
            'details' => $request->details,
        ];

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($motor->image_path) {
                Storage::disk('public')->delete($motor->image_path);
            }
            $data['image_path'] = $request->file('image')->store('motors', 'public');
        }

        $motor->update($data);

        // Update specifications in the separate table
        $newSpecs = $request->input('specifications', []);
        
        // Delete existing specifications
        $motor->specifications()->delete();
        
        // Add new specifications
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

        return redirect()->route('admin.motors.index')->with('success', 'Motor updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Motor $motor): RedirectResponse
    {
        // Delete the image file
        if ($motor->image_path) {
            Storage::disk('public')->delete($motor->image_path);
        }

        $motor->delete();

        return redirect()->route('admin.motors.index')->with('success', 'Motor deleted successfully.');
    }
}