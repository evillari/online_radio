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
    <div class="p-4 flex justify-between nav-menu bg-black text-white">
        <div class="p-2" > 
            <a href="/" > Online Radio</a>
        </div>
        <div class="flex items-center hover:bg-gray-900 p-2 rounded cursor-pointer" >
         
            <div> 
                <a  href="/profile">  
                    <span > {{ Auth::user()->username }} </span>         
                </a> 
                
            </div>
        </div>
    </div>
   
    @yield('content')
            
</body>
</html>
