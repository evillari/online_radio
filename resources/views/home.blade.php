@extends('layouts.navbar')

@section('content')
<div id="radio" class="overflow-x-hidden overflow-y-hidden"  data-userid="{{ auth()->user()->profile->user_id }}" data-username ="{{ auth()->user()->profile->username }}" data-genre="{{ auth()->user()->profile->genre }}" data-country="{{ auth()->user()->profile->country }}" > 
    </div>
@endsection
 