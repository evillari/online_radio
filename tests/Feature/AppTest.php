<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\Profile;

class AppTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_user_get_redirected_to_welcome_page()
    {
        $response = $this->get('/')->assertViewIs('welcome');
    }

    public function test_authenticated_user_get_redirected_to_homepage()
    {
        $this->actingAs(factory(User::class)->create());
        $response = $this->get('/')->assertViewIs('home');
    }

    public function test_authenticated_user_is_authorized_to_edit_profile()
    {
        $authenticated_user = factory(User::class)->create();
        $this->actingAs($authenticated_user);
        $this->get('/profile/' . $authenticated_user->username . "/edit")->assertViewIs('profile.edit');
    }
}
