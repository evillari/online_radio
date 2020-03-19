<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Profile;
use Faker\Generator as Faker;
use Faker\Provider\en_US\Person as Person;
use Faker\Provider\en_US\Address as Address;


$factory->define(Profile::class, function (Faker $faker) {
    $faker->addProvider(new Person($faker), new Address($faker));
    return [

        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName,
        'image' => "",
        'genre' => "music",
        'country' => $faker->country


    ];
});
