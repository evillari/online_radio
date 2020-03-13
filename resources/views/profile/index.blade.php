@extends('layouts.navbar')

@section('content')
<div >
    <div class="text-right p-4 ">
        <form method="POST" action="{{route('logout')}}"> 
            @csrf
            <button class="bg-blue-500 px-4 py-2 rounded-full" > Logout </button> 
        </form>
    </div>
</div>

<div class="flex flex-col"> 
    <div class="text-center py-4">
        <h1 class="uppercase"> Profile </h1>
    </div>
    <div class="mx-auto border py-4"> 
        <div class="flex justify-center px-4 w-screen "> 
            <div class="w-4/12 text-right">        
                <h1 > First Name: </h1>
            </div>
            <div class="pl-2 w-5/12"> 
                <h1 > {{ $user->profile->firstname ?? "no info" }}  </h1>
            </div>
        </div>
        <div class="flex justify-center px-4 w-screen ">       
            <div class="w-4/12 text-right"> 
                <h1> Last Name:  </h1>
            </div>
            <div class="pl-2 w-5/12"> 
                <h1> {{ $user->profile->lastname ?? "no info"}} </h1>
            </div>
            
        </div>
        
        <div class="flex justify-center px-4 w-screen "> 
            <div class="w-4/12 text-right">        
                <h1 > Username: </h1>
   
            </div>
            <div class="pl-2 w-5/12"> 
                <h1 > {{ $user->profile->username ?? "no info"}}  </h1>
            </div>
        </div>
    
    </div>
    <div class="flex justify-around py-8"> 
        <div > 
        <a class="bg-blue-500 px-4 py-2 rounded-full" href = "/profile/{{$user->profile->username}}/edit"> Edit Profile</a>
        </div>
        <div> 
            <form method="POST" action="/profile/{{$user->username}}" >
                @csrf
                @method('DELETE')
                <button class="bg-blue-500 px-4 py-2 rounded-full" > Delete Profile </button>
            </form>
        </div>
    </div>
    
</div>
    
@endsection