<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body >
    
    <div class="px-4 py-2 flex justify-between nav-menu text-gray-700 border-b-2 ">
        
        
        <a class="px-2 tracking-widest" href="/"> 
            <h1 > Online Radio</h1>
        </a>
        <a class="flex items-center px-2 rounded cursor-pointer" href="/profile">
         
            
            <div class="outline-none px-2">

            <img src="{{ auth()->user()->profile->profileImage() }}" width="30px" height="30px" class="rounded-full" />
            </div>
            <div class="pr-2"> 
             
                    <h1 > {{ Auth::user()->username }} </h1>                  
            </div>
            
        </a>
    </div>

   
    @yield('content')
            
</body>
</html>
