<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test contact form validation errors.
     */
    public function test_contact_form_validation_errors()
    {
        $response = $this->postJson(route('contact.submit'), [
            'name' => '',
            'email' => '',
            'message' => '',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'message']);
        
        $response = $this->postJson(route('contact.submit'), [
            'name' => 'Test User',
            'email' => 'not-an-email',
            'message' => 'Hello',
        ]);
        
        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    /**
     * Test user can submit contact form.
     */
    public function test_user_can_submit_contact_form()
    {
        $response = $this->postJson(route('contact.submit'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['message' => 'Terima kasih! Pesan Anda telah terkirim.']);
        
        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message.',
        ]);
    }
}
