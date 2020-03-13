@extends('layouts.app')

@section('content')
<div class="mx-auto flex justify-center container pt-32">

    <form method="POST" action="{{ route('login') }}" class="p-20 border rounded-lg shadow-lg w-full md:w-7/12 lg:w-5/12">
        @csrf
        <div class=""> 
            <div class="mx-auto text-center flex justify-center items-center bg-gray-400  rounded-full"> 
                <div class="p-4 ">
                    <span class="text-2xl uppercase"> Sign In </span>
                </div>
            </div>
            <div class="py-24">  
                <div class="">
            
                    <div class="flex border rounded-full overflow-hidden ">
                  
                        <i class="fas fa-user pl-4 pr-6 text-center p-2 bg-gray-200 w-1/12"></i>
                      
                        <input id="username" type="username" class=" hover:bg-gray-100 flex-1 w-auto outline-none  form-control @error('username') is-invalid @enderror" placeholder="username" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                      
                    </div>
                    <div> 
                        @error('username')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                        </div> 
                </div>

                <div class="py-8">
                    <div class=" flex border rounded-full overflow-hidden">
                        <i class="fas fa-key pl-4 pr-6 text-center p-2 bg-gray-200 w-1/12"></i>
                        <input id="password" type="password" class="hover:bg-gray-100 flex-1 w-auto outline-none  form-control @error('password') is-invalid @enderror" placeholder="password" name="password" required autocomplete="current-password">
                        
                    </div>
                    <div>
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                        </div>
                </div>

                <div class="pt-4">
                    <div class="">
                        <button type="submit" class=" text-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">
                            Login
                        </button>   
                    </div>
                    <div class="text-center"  > 
                        <a  href="{{route('register')}} "><span class="underline text-blue-500"> Register </span> </a>
                    </div>
                </div>
            </div>
        </div>
    </form>
      
</div>
@endsection
