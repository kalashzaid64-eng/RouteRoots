<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        Activity::create([
            'user_id' => 1,
            'type' => 'running',
            'distance' => 5.5,
            'duration' => 60,
            'date' => '2026-06-01',
        ]);

        Activity::create([
            'user_id' => 1,
            'type' => 'cycling',
            'distance' => 20,
            'duration' => 90,
            'date' => '2026-06-05',
        ]);

        Activity::create([
            'user_id' => 1,
            'type' => 'skating',
            'distance' => 10,
            'duration' => 45,
            'date' => '2026-06-10',
        ]);

        Activity::create([
            'user_id' => 2,
            'type' => 'running',
            'distance' => 8,
            'duration' => 75,
            'date' => '2026-06-03',
        ]);

        Activity::create([
            'user_id' => 2,
            'type' => 'cycling',
            'distance' => 15,
            'duration' => 80,
            'date' => '2026-06-08',
        ]);
    }
}
