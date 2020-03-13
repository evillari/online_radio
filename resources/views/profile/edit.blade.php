@extends('layouts.navbar')

@section('content')
<div class="mx-auto flex justify-center container pt-32">
 
    <form method="POST" action="/profile/{{$user->username}}" enctype="multipart/form-data" class="p-20 border rounded-lg shadow-lg w-full md:w-9/12 lg:w-8/12">
        @csrf
        @method('PATCH')
        
        <div class="mx-auto text-center flex justify-center items-center bg-gray-400  rounded-full"> 
            <div class="p-4 ">
                <span class="text-2xl uppercase"> Profile Information </span>
            </div>
        </div>
        <div class="py-24"> 
            <div class="flex flex-col sm:flex-row sm:justify-between">
                <div class="flex border rounded-full overflow-hidden sm:w-5/12 mb-8 sm:mb-0">
                    <i class="fas fa-user  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="firstname" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('firstname') is-invalid @enderror" placeholder="firstname" name="firstname" value="{{ old('firstname') ?? $user->profile->firstname }}" required autocomplete="firstname" autofocus>
                   
                </div>
                <div>
                    @error('firstname')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="flex border rounded-full overflow-hidden sm:w-5/12">
                    <i class="fas fa-user  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="lastname" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('lastname') is-invalid @enderror" placeholder="lastname" name="lastname" value="{{ old('lastname') ?? $user->profile->lastname }}" required autocomplete="lastname" autofocus>
                   
                </div>
                <div> 
                    @error('lastname')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    </div>
            </div>

            <div class="sm:flex sm:flex-row sm:items-center sm:justify-between">
                <div class="flex border rounded-full overflow-hidden sm:w-5/12 my-8 ">
                    <i class="fas fa-user  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="username" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('username') is-invalid @enderror" placeholder="username" name="username" value="{{ old('username') ?? $user->profile->username }}" required autocomplete="username" autofocus>
                </div>
            </div>
            <div> 
                @error('username')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
                
        
         
            <div class="pt-8">
                <div class="">
                    <button type="submit" class="text-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">
                        Update 
                    </button>
                </div>
            </div>
        </div>
    </form>

</div>
@endsection
