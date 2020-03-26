<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class MessageController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }

    public function createNewMessage() //test
    {
        $temp = [
            'from' => 'test',
            'to' => 'to',
            'Message' => 'test message',
            'event' => 'test event'

        ];
        $s = serialize($temp);
        Message::create([
            'message' => $s
        ]);

        $t = Message::where('link', '=', 'test')->select('message')->get();
        dd($t[0]['message']);
    }

    public function show(Request $request)
    {
        $forwardlink = $request->forwardlink;

        $messages = Message::where('link', '=', $forwardlink)->select('message')->get();

        $unserializedmessages = [];

        foreach ($messages as $message) {
            $unserialized = unserialize(($message['message']));
            if (isset($unserialized)) {
                array_push($unserializedmessages, $unserialized);
            }
        }

        return json_encode($unserializedmessages);
    }

    public function create(Request $request)
    {
        $forwardlink = $request->forwardlink;
        $reverselink = $request->reverselink;

        $data = json_decode($request->data, true);

        $serializeddata = serialize($data);
        Message::create([
            'link' => $forwardlink,
            'message' => $serializeddata
        ]);
        Message::create([
            'link' => $reverselink,
            'message' => $serializeddata
        ]);

        $payload = json_encode([
            'event' => $data['from'],
            'data' => $data,
            'socket' => '',
        ]);

        Redis::publish('message-channel', $payload);

        $payload = json_encode([
            'event' => $data['to'],
            'data' => $data,
            'socket' => '',
        ]);

        Redis::publish('message-channel', $payload);
    }
}
