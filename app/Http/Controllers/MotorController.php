<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MotorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $query = Motor::query();
        
        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%')
                  ->orWhere('model', 'like', '%' . request('search') . '%')
                  ->orWhere('brand', 'like', '%' . request('search') . '%');
        }
        
        $motors = $query->get();
        
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
            'specifications' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'details' => 'nullable|string',
        ]);

        $imagePath = $request->file('image')->store('motors', 'public');

        Motor::create([
            'name' => $request->name,
            'brand' => $request->brand,
            'model' => $request->model,
            'price' => $request->price,
            'year' => $request->year,
            'type' => $request->type,
            'specifications' => $request->specifications,
            'image_path' => $imagePath,
            'details' => $request->details,
        ]);

        return redirect()->route('admin.motors.index')->with('success', 'Motor created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Motor $motor): View
    {
        return view('pages.admin.motors.show', compact('motor'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Motor $motor): View
    {
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
            'specifications' => 'nullable|string',
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
            'specifications' => $request->specifications,
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