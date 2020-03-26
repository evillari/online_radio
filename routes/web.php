<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Events\PresenceEvent;

Auth::routes();


Route::get('/', 'HomeController@index')->name('index');

Route::get('/profile', 'ProfilesController@index')->name('profile');

Route::get('/profile/{user}/edit', 'ProfilesController@edit')->name('profile.edit');

Route::patch('/profile/{user}', 'ProfilesController@update')->name('profile.update');

Route::delete('/profile/{user}', 'ProfilesController@destroy')->name('profile.destroy');

Route::get('/testMessage', 'MessageController@createNewMessage');

Route::get('/messages/create/{forwardlink}/{reverselink}/{data}', 'MessageController@create')->name('messages.create');

Route::get('/messages/{forwardlink}', "MessageController@show")->name('messages.show');

Route::get('/togglefavorite/{stationid}', 'ActivityController@toggleFavorite');

Route::get('/isfavorite/{stationid}', 'ActivityController@isFavorite');

Route::get('/favorites', "ActivityController@favoritesIndex");
