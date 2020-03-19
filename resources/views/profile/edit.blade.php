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
                    <input id="firstname" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('firstname') is-invalid @enderror" placeholder="firstname" name="firstname" value="{{ old('firstname') ?? $user->profile->firstname }}"  autocomplete="firstname" autofocus>
                   
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
                    <input id="lastname" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('lastname') is-invalid @enderror" placeholder="lastname" name="lastname" value="{{ old('lastname') ?? $user->profile->lastname }}"  autocomplete="lastname" autofocus>
                   
                </div>
                <div> 
                    @error('lastname')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                    </div>
            </div>

            <div class="flex flex-col sm:flex sm:flex-row sm:items-center sm:justify-between">
                <div class="flex border rounded-full overflow-hidden sm:w-5/12 my-8 ">
                    <i class="fas fa-guitar  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <select id="genre" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('genre') is-invalid @enderror"  name="genre" value="{{ old('genre') ?? $user->profile->genre }}" required  autofocus>
                        <option>70's</option>
                        <option>80's</option>
                        <option>90's</option>
                        <option>00's</option>
                        <option>Adult Contemporary</option> 
                        <option selected>Alternative</option>
                        <option>Christian</option>                                      
                        <option>ClassicCountry</option>  
                        <option>Classical</option>     
                        <option>Country</option> 
                        <option>Electronic</option>
                        <option>Chill</option>
                        <option>Dubstep</option>
                        <option>House</option>
                        <option>Industrial</option>
                        <option>Techno</option>
                        <option>Trance</option>
                        <option>Hip Hop</option> 
                        <option>Indian</option>
                        <option>Jazz</option>                     
                        <option>Latin Hits</option>
                        <option>Metal</option>  
                        <option>Oldies</option>      
                        <option>Rap</option>
                        <option>Reggae</option>       
                        <option>Rock</option> 
                        <option>Standards</option>                   
                    </select>
                </div>
            
                <div> 
                    @error('genre')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="flex border rounded-full overflow-hidden sm:w-5/12 my-2 ">
                    <i class="fas fa-location-arrow  pl-4 pr-6 bg-gray-200 text-center p-2"></i>
                    <input id="country" type="text" class=" hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('country') is-invalid @enderror" placeholder="country" name="country" value="{{ old('country') ?? $user->profile->country }}" autocomplete="country" autofocus>
                </div>
            
                <div> 
                    @error('country')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
    
            </div>

            <div class="flex flex-col justify-center sm:w-7/12 mx-auto">      
                <div class="flex border rounded-full overflow-hidden my-2 ">
                    <i class="fas fa-address-card pl-4 pr-6 bg-gray-200 text-center p-2"></i>     
                    <input type="file" class=" px-2 hover:bg-gray-100 flex-1 w-auto outline-none form-control @error('country') is-invalid @enderror"  name="image"  id="image" name="image" onchange="readImage(this);"> 
                </div>               
                <script>
                        function readImage(input) {
                            if (input.files && input.files[0]) {
                                var reader = new FileReader();

                                reader.onload = function (e) {
                                    $('#preview').attr('src', e.target.result);
                                };
                                reader.readAsDataURL(input.files[0]);
                            }
                        }
                </script>
          
                <div class="text-center">
               
                    <h1 class="text-sm text-gray-700 italic">Image dimension should not be > 256 by 256.</h1>
                    
                    <img id="preview" class="mx-auto " src="{{ auth()->user()->profile->profileImage() }}" width="150px" height="150px" alt="Profile Image" />
                    <div class="text-center"> 
                        @error('image')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>
                
    
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
