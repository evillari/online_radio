<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $guarded = [];
    // protected $fillable = [
    //     'username', 'password',
    //];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'username';
    }

    public function profile()
    {

        return $this->hasOne(Profile::class);
    }
    public static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            $user->profile()->create([
                'username' => $user->username,
                'image'  => 'data:image/;base64, /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCACAAIADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACis+81WG2Yog8yQdh0FZcms3jn5XVB6Bf8aAOkorm01e8Q8ur+xUf0rStNYinYJKPLc9+xoA0qKKKACiiigAooooAKKKKACiiigArM1a/MCeTEcSMOSP4RWn0FcjczG4uZJT/ABNx9KAZFRRRVEhRRRQBuaRfl/8ARpTkgfIT/KteuPikaKVJFPzKciuuRw6K46MMikxodRRRSGFFFFABRRRQAUUUUARznFvJjrsP8q5CuyIDKQeh4rkJUMUrxt1UkU0JjKKKKYgooooAK6uxJNhBn+4K5UAswAGSeMV18KeVDHH/AHVC0mND6KKKQwooooAKKKKACiiigArE1mzIf7Sg+U8P7e9bdIQGUqwyDwQaAONorYvNFYMXteV/uE9PpWXJBLEcSRuv1FMkjop6RSSHCRux9hmtK00aR2D3PyJ/dHU0AN0ezMs32hx8ifd9zXQU1EWNAiKFVeABTqRQUUUUAFFFFABRRRQAUUVk3+riImK2wz937CgDSmnit13Suqj3rNm12NeIYi3u3ArEkkeVy7sWY9zTadhXNB9Zu3+6yJ9F/wAahOo3h/5bv+FVaKALQ1G8H/Lw/wCNTJrN4n3mR/qv+FZ9FAG5DrqHiaIr7qc1pQ3ENwu6KQMPY81yNOR3jYOjFWHcUWC52NFZFjrAciK5wG7P2/GtekMKKKKACiimTSCGF5D0VSaAMvV78x/6NEcMfvkdvasOnO7SSM7nLMck02mIKKKKYgooooAKKKKACiiigAra0i/LEW0pz/cJ/lWLSqxRldTgqcg0hnZUVHbyie3jlH8S5qSkMKhuoDc2zwh9m7vjNTUUAYv9gf8ATz/45/8AXo/sD/p5/wDHP/r1tUUAYv8AYH/Tz/45/wDXo/sD/p5/8c/+vW1RQBi/2B/08/8Ajn/16P7A/wCnn/xz/wCvW1RQBi/2B/08/wDjn/16P7A/6ef/ABz/AOvW1RQBi/2B/wBPP/jn/wBej+wP+nn/AMc/+vW1RQBi/wBgf9PP/jn/ANej+wP+nn/xz/69bVFAEFpb/ZbZYd+/bnnGKnoooA//2Q=='
            ]);
        });
    }
}
