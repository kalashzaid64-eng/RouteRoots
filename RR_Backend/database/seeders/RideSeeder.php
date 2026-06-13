<?php

namespace Database\Seeders;

use App\Models\Ride;
use Illuminate\Database\Seeder;

class RideSeeder extends Seeder
{
    public function run(): void
    {
    Ride::create([
        'user_id' => 1,
        'title' => 'Morning Run',
        'activity_type' => 'running',
        'location' => 'Amman',
        'distance' => 5.5,
        'fee' => 0,
        'ride_date' => '2026-06-20 07:00:00',
        'duration' => 60,
        'latitude' => 31.9539,
        'longitude' => 35.9106,
    ]);

    Ride::create([
        'user_id' => 1,
        'title' => 'Evening Cycling',
        'activity_type' => 'cycling',
        'location' => 'Amman',
        'distance' => 20,
        'fee' => 5,
        'ride_date' => '2026-06-21 18:00:00',
        'duration' => 90,
        'latitude' => 31.9700,
        'longitude' => 35.9300,
    ]);

    Ride::create([
        'user_id' => 2,
        'title' => 'Weekend Skate',
        'activity_type' => 'skating',
        'location' => 'Amman',
        'distance' => 10,
        'fee' => 0,
        'ride_date' => '2026-06-30 10:00:00',
        'duration' => 45,
        'latitude' => 31.9400,
        'longitude' => 35.8900,
    ]);
    }
}