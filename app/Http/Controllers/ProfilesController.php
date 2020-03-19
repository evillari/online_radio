<?php

namespace App\Http\Controllers;

use App\Profile;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Facades\Image;

class ProfilesController extends Controller
{

    public function __construct()
    {
        return $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $user = auth()->user();
        return view('profile.index', compact('user'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user->profile);
        return view('profile.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(User $user)
    {

        $this->authorize('update', $user->profile);
        $info = request()->validate([
            'firstname' => '',
            'lastname' => '',
            'genre' => '',
            'country' => '',
            'image' =>  'max :1000 | image | dimensions:max_width=256,max_height=256'

        ]);

        if (request('image')) {

            $image = request('image');
            $type = pathinfo($image, PATHINFO_EXTENSION);
            $file_content = file_get_contents($image);
            $base64image = "data:image/" . $type . ";base64, " . base64_encode($file_content);

            $imageArray = ['image' => $base64image];
        }

        auth()->user()->profile->update(array_merge(
            $info,
            $imageArray ?? []
        ));

        return redirect('/profile');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user_to_delete = $user;
        Auth::logout();

        if ($user_to_delete->delete()) {
            $user_to_delete->profile->delete();

            return redirect('/');
        }
    }
}
