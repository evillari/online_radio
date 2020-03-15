<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use GuzzleHttp\Client;


use function GuzzleHttp\json_decode;

class RequestController extends Controller
{
    public function getTopHits() {
        $src = "http://api.dar.fm/topsongs.php?q=Music&callback=json&partner_token=7824139131";
        $client = new Client();
        $result = $client->request('GET', $src);
        $reply = array(
            "statuscode"=>$result->getStatusCode(),
            "body"=>   json_decode($result->getBody())
        );
        return json_encode($reply,JSON_PRETTY_PRINT);
    }

    public function getIndex($param) {

        $src = "http://api.dar.fm/songartist.php?search_index=songlist_artist_index2&q=" . "*" . $param . "*" . "&callback=json&partner_token=7824139131";
        $client = new Client();
        $result = $client->request('GET', $src);
        return $result->getBody();
    }

    public function getPlayList($param) {
        $src =  "http://api.dar.fm/playlist.php?q=" . $param ."&callback=json";
        $client = new Client();
        $result = $client->request('GET', $src);
        return $result->getBody();
    }

    public function getStationInfo($param){
        $src = "http://api.dar.fm/uberstationurl.php?station_id=" .  $param . "&callback=json&partner_token=7824139131";
        $client = new Client();
        $result = $client->request('GET', $src);
        $playable_url = json_decode($result->getBody(), true)['result'][0]['url'];
        
        $query = "http://api.dar.fm/darstations.php?station_id=" . $param . "&callback=json&partner_token=7824139131";
        $result = $client->request('GET', $query);
        $station = json_decode($result->getBody(), true)['result'][0]['stations'][0];
        //url,id,callsign, image, description, encoding, country, state, city, language, 
        
        $reply = array(          
            'id'=>$station['station_id'],
            'callsign'=>$station['callsign'],
            'url' => $playable_url,
            'image' => $station['station_image'],
            'description' => $station['description'],
            'encoding' => $station['encoding'],
            'country' => $station['country'],
            'state' => $station['state'],
            'city' => $station['city'],
            'language' => $station['language']        
        );
      
        return json_encode($reply, JSON_PRETTY_PRINT);     

    }

    public function getArtistImage($param) {
        $src = "http://api.dar.fm/songart.php?artist=" . $param ."&res=med&callback=json&partner_token=7824139131";
        
        $client = new Client();
        $result = $client->request('GET', $src);
        return $result->getBody();
    }

    public function getCurrentPlaying($param){
        $src = "http://api.dar.fm/playlist.php?station_id=" . $param . "&callback=json&partner_token=7824139131";

        $client = new Client();
        $result = $client->request('GET', $src);
        return $result->getBody();
    }
}   


