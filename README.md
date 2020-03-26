# Laravel - Online Radio

## Prerequisite

Version: Laravel 6.x
Frontend Scaffolding: React with Auth
CSS: Tailwind CSS

##Setup
- Install Laravel-Echo-Server
    `npm install -g laravel-echo-server`
- Install Redis
    `sudo apt install redis-server`   
- Change Constant variables for your server.

#Configuration
#### With Laravel-Echo-Server, Redis publishes event through this format:
```
    $payload=json_encode([
        'event' => 'event-name',
        'data' => 'data',
        'socket' => 'socket'
    ]);

    Redis::publish('channel-name', $payload);
````
#### Client side
```
 window.Echo.listen("chanel-name', "." + 'event-name', (data) => {
    console.log(data.data);
 });
```
#### Note:
You may intercept client events directly from the Laravel-Echo-Server when the user leave or join the channel. This way you will know when the user left the page or close the browser of your application. Within this intercept, you may call Http request or publish Redis broadcast.
