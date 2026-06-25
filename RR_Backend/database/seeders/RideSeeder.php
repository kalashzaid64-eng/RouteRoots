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
            'club_id' => 1,
            'title' => 'Morning Run',
            'activity_type' => 'running',
            'location' => 'Damascus - Mezzeh',
            'distance' => 5.5,
            'fee' => 0,
            'ride_date' => '2025-01-10 07:00:00',
            'duration' => 60,
            'latitude' => 33.5138,
            'longitude' => 36.2765,
        ]);

        Ride::create([
            'user_id' => 1,
            'club_id' => 1,
            'title' => 'Evening Cycling',
            'activity_type' => 'cycling',
            'location' => 'Damascus - Abu Rummaneh',
            'distance' => 20,
            'fee' => 500,
            'ride_date' => '2026-07-05 18:00:00',
            'duration' => 90,
            'latitude' => 33.5100,
            'longitude' => 36.2800,
        ]);

        Ride::create([
            'user_id' => 2,
            'club_id' => 2,
            'title' => 'Weekend Skate',
            'activity_type' => 'skating',
            'location' => 'Damascus - Malki',
            'distance' => 10,
            'fee' => 0,
            'ride_date' => '2026-07-12 10:00:00',
            'duration' => 45,
            'latitude' => 33.5200,
            'longitude' => 36.2700,
        ]);

        Ride::create([
            'user_id' => 1,
            'club_id' => 1,
            'title' => 'Friday Run',
            'activity_type' => 'running',
            'location' => 'Damascus - Rukn al-Din',
            'distance' => 8,
            'fee' => 0,
            'ride_date' => '2026-07-18 07:30:00',
            'duration' => 75,
            'latitude' => 33.5300,
            'longitude' => 36.2900,
        ]);

        Ride::create([
            'user_id' => 2,
            'club_id' => 3,
            'title' => 'Cycling Tour',
            'activity_type' => 'cycling',
            'location' => 'Damascus - Kafr Sousa',
            'distance' => 15,
            'fee' => 300,
            'ride_date' => '2026-07-25 17:00:00',
            'duration' => 80,
            'latitude' => 33.5050,
            'longitude' => 36.2600,
        ]);
    }
}
