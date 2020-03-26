@extends('layouts.navbar')

@section('content')
<div id="radio" class="overflow-x-hidden"  data-userid="{{ auth()->user()->profile->user_id }}" data-username ="{{ auth()->user()->profile->username }}" data-genre="{{ auth()->user()->profile->genre }}" data-country="{{ auth()->user()->profile->country }}" data-src={{ auth()->user()->profile->profileImage()}} > 
    </div>
@endsection
 