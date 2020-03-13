@extends('layouts.home')

@section('content')
    <div class="flex items-center mx-auto justify-center h-screen pb-40 text-gray-700" > 
        <div class="text-center ">
            <h1 class="text-4xl  p-4 " style="font-family: Kaushan Script" >The world needs music and so are you.</h1>
           
            <a href="{{route('register')}}"> <h1 class="bg-gray-900 py-2 mt-2 rounded" style="font-family: 'Montserrat', sans-serif">   <span class="text-white uppercase"> register <span>  </h1></a> 
                <h1 class=" text-lg " style="font-family: 'Montserrat', sans-serif"> Please <a href="{{route('login')}}"> <span class="text-blue-500 font-bold"> login <span> </a>  continue.</h1>
        </div>
    </div>
@endsection