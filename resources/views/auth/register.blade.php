@extends('layouts.app')

@section('content')
<div class="mx-auto flex justify-center container pt-32">
    <form method="POST" action="{{ route('register') }}" class="p-20 border rounded-lg shadow-lg w-full md:w-7/12 lg:w-5/12">
        @csrf
        <div class="mx-auto text-center flex justify-center items-center bg-gray-400  rounded-full"> 
            <div class="p-4 ">
                <span class="text-2xl uppercase"> Sign Up </span>
            </div>
        </div>
        <div class="py-24"> 
            <div class="">
        
                <div class="flex border rounded-full overflow-hidden ">
                    <i class="fas fa-user  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="username" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('username') is-invalid @enderror" placeholder="username" name="username" value="{{ old('username') }}" required autocomplete="username" autofocus>
                    
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
        

                <div class="flex border rounded-full overflow-hidden ">
                    <i class="fas fa-unlock  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="password" type="password" class="hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('password') is-invalid @enderror" placeholder="password" name="password" required autocomplete="new-password">
                 
                </div>
                <div> 
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    </div>
            </div>

            <div class="pb-16">
                <div class="flex border rounded-full overflow-hidden">
                    <i class="fas fa-lock  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="password-confirm" type="password" class="hover:bg-gray-100 flex-1 w-auto  outline-none form-control" placeholder="confirm password" name="password_confirmation" required autocomplete="new-password">
                </div>
            </div>

            <div class="">
                <div class="">
                    <button type="submit" class="text-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">
                        Register
                    </button>
                    <div class="text-center"  > 
                        <a  href="{{route('login')}} "><span class="underline text-blue-500"> Login </span> </a>
                    </div>
                </div>
            </div>
        </div>
    </form>

</div>
@endsection
