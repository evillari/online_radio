<?php

namespace App\Http\Controllers;

use App\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ActivityController extends Controller
{

    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function isFavorite(Request $request)
    {
        $stationid = $request->stationid;
        $userid = auth()->user()->id;
        $favorites = Favorite::where('user_id', '=', $userid)->select('favorites')->first();

        if (isset($favorites)) {
            $favorites = unserialize($favorites['favorites']);

            if (in_array($stationid, $favorites)) {
                return json_encode(['return' => true]);
            } else {
                return json_encode(['return' => false]);
            }
        } else {
            return json_encode(['return' => false]);
        }
    }

    public function toggleFavorite(Request $request)
    {
        $stationid = $request->stationid;
        $userid = auth()->user()->id;
        $favorites = Favorite::where('user_id', '=', $userid)->select('favorites')->first();

        if (isset($favorites)) {

            $favorites = unserialize($favorites['favorites']);


            if (in_array($stationid, $favorites)) {
                $key = array_search($stationid, $favorites);
                unset($favorites[$key]);

                $new_favorites = array_values($favorites);
                Favorite::where('user_id', '=', $userid)->update([
                    'favorites' => serialize($new_favorites)
                ]);


                $data = [
                    'owner' => auth()->user()->username,
                    'activity' => 'favoriteupdate',
                    'data' => $new_favorites
                ];


                $payload = json_encode([
                    'event' => 'roster-event',
                    'data' => $data,
                    'socket' => '',
                ]);

                Redis::publish('roster-channel', $payload);


                return json_encode(['return' => false]);
            } else {

                array_push($favorites, strVal($stationid));


                Favorite::where('user_id', '=', $userid)->update([
                    'favorites' => serialize($favorites)
                ]);



                $data = [
                    'owner' => auth()->user()->username,
                    'activity' => 'favoriteupdate',
                    'data' => $favorites
                ];


                $payload = json_encode([
                    'event' => 'roster-event',
                    'data' => $data,
                    'socket' => '',
                ]);

                Redis::publish('roster-channel', $payload);


                return json_encode(['return' => true]);
            }
        } else {
            $favorite = [
                $stationid
            ];
            Favorite::create([
                'user_id' => $userid,
                'favorites' => serialize($favorite)
            ]);


            $data = [
                'owner' => auth()->user()->username,
                'activity' => 'favoriteupdate',
                'data' => $favorite
            ];


            $payload = json_encode([
                'event' => 'roster-event',
                'data' => $data,
                'socket' => '',
            ]);

            Redis::publish('roster-channel', $payload);

            return json_encode(['return' => true]);
        }
    }

    public function favoritesIndex()
    {
        $userid = auth()->user()->id;
        $favorites = Favorite::where('user_id', '=', $userid)->select('favorites')->first();

        if (isset($favorites)) {
            $favorites = unserialize($favorites['favorites']);
            return json_encode($favorites, JSON_PRETTY_PRINT);
        } else {
            return json_encode([]);
        }
    }
}
