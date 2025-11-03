<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = ContactMessage::query();
        
        if (request('search')) {
            $query->where('name', 'like', '%' . request('search') . '%')
                  ->orWhere('email', 'like', '%' . request('search') . '%')
                  ->orWhere('subject', 'like', '%' . request('search') . '%')
                  ->orWhere('message', 'like', '%' . request('search') . '%');
        }
        
        $contactMessages = $query->latest()->paginate(10);
        
        return view('pages.admin.contact.index', compact('contactMessages'));
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactMessage $contact)
    {
        return view('pages.admin.contact.show', compact('contact'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactMessage $contact)
    {
        $contact->delete();
        
        return redirect()->route('admin.contact.index')->with('success', 'Pesan kontak berhasil dihapus.');
    }
}
