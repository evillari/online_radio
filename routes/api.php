<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use GuzzleHttp\Client;

Route::get('/test', function() {
   return 'hello api test';
});

Route::get('/tophits', 'API\RequestController@getTopHits');

Route::get('/search_index/{params}', 'API\RequestController@getIndex');

Route::get('/playlist/{params}', 'API\RequestController@getPlayList');

Route::get('/station_info/{params}', 'API\RequestController@getStationInfo');

Route::get('/artist_image/{params}','API\RequestController@getArtistImage');

Route::get('/current_playing/{params}','API\RequestController@getCurrentPlaying');