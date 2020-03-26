<?php

namespace App\Http\Controllers;

use App\Roster;
use App\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;


class EventController extends Controller
{


    public function updateRoster(Request $request)
    {
        if ($request->activity == 'login') {

            $status = Roster::where('user_id', '=', $request->userid)->select('status')->first()['status'];
            $socketids = Roster::where('user_id', '=', $request->userid)->select('socketids')->first()['socketids'];

            $this->clearUpRoster($request->userid);
            if ($status == 'offline') {

                Roster::where('user_id', '=', $request->userid)
                    ->update([
                        'status' => 'online',
                        'socketids' => $request->socketid
                    ]);
                // publish roster update
                $roster_online = Roster::where('status', '=', 'online')->pluck('user_id');
                $roster_offline = Roster::where('status', '=', 'offline')->pluck('user_id');
                $users_online = Profile::whereIn('user_id', $roster_online)->select('username', 'image', 'genre', 'country')->get();
                $users_offline = Profile::whereIn('user_id', $roster_offline)->select('username', 'image', 'genre', 'country')->get();


                $users = [
                    'online' => $users_online,
                    'offline' => $users_offline
                ];

                $data = [
                    'activity' => 'rosterupdate',
                    'data' => $users
                ];
                $payload = json_encode([
                    'event' => 'roster-event',
                    'data' => $data,
                    'socket' => '',
                ]);

                Redis::publish('roster-channel', $payload);
            } else {
                Roster::where('user_id', '=', $request->userid)
                    ->update([
                        'socketids' =>  $socketids . "," . $request->socketid
                    ]);

                $roster_online = Roster::where('status', '=', 'online')->pluck('user_id');
                $roster_offline = Roster::where('status', '=', 'offline')->pluck('user_id');
                $users_online = Profile::whereIn('user_id', $roster_online)->select('username', 'image', 'genre', 'country')->get();
                $users_offline = Profile::whereIn('user_id', $roster_offline)->select('username', 'image', 'genre', 'country')->get();


                $users = [
                    'online' => $users_online,
                    'offline' => $users_offline
                ];

                return $users;
            }
        }

        if ($request->activity == 'logout') {

            $roster = Roster::where('socketids', 'like', '%' . $request->socketid . '%')->select('socketids', 'user_id')->first();

            if (isset($roster)) {
                $socketids = $roster['socketids'];
                $userid = $roster['user_id'];
                $socketids = preg_replace(
                    array("/" . preg_quote($request->socketid, "/") . "/", '/^[,]+/', '/[,]+$/', '/[,]+/'),
                    array('', '', '', ','),
                    $socketids
                );

                if (strlen($socketids) > 0) {
                    Roster::where('user_id', '=', $userid)
                        ->update([
                            'socketids' =>  $socketids
                        ]);
                } else {
                    Roster::where('user_id', '=', $userid)
                        ->update([
                            'status' => 'offline',
                            'socketids' => ''
                        ]);

                    //publish new roster
                    $roster_online = Roster::where('status', '=', 'online')->pluck('user_id');
                    $roster_offline = Roster::where('status', '=', 'offline')->pluck('user_id');
                    $users_online = Profile::whereIn('user_id', $roster_online)->select('username', 'image', 'genre', 'country')->get();
                    $users_offline = Profile::whereIn('user_id', $roster_offline)->select('username', 'image', 'genre', 'country')->get();

                    $users = [
                        'online' => $users_online,
                        'offline' => $users_offline
                    ];

                    $data = [
                        'activity' => 'rosterupdate',
                        'data' => $users
                    ];

                    $payload = json_encode([
                        'event' => 'roster-event',
                        'data' => $data,
                        'socket' => '',
                    ]);

                    Redis::publish('roster-channel', $payload);
                }
            }
        }
    }

    public function clearUpRoster($userid)
    {

        $status = Roster::where('user_id', '=', $userid)->select('status')->get();
        $socketids = Roster::where('user_id', '=', $userid)->select('socketids')->get();
        $status = $status[0]['status'];
        $socketids = $socketids[0]['socketids'];

        if ($status == 'offline') {
            Roster::where('user_id', '=', $userid)
                ->update([
                    'socketids' => ''
                ]);
        }

        if (strlen($socketids) == 0) {
            Roster::where('user_id', '=', $userid)
                ->update([
                    'status' => 'offline'
                ]);
        }
    }
}
