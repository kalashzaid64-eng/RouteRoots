<?php

namespace Database\Seeders;

use App\Models\Club;
use Illuminate\Database\Seeder;

class ClubSeeder extends Seeder
{
    public function run(): void
    {
    Club::create([
        'user_id' => 1,
        'name' => 'Amman Runners',
        'description' => 'Running club in Amman',
        'activity_type' => 'running',
        'location' => 'Amman',
        'rating' => 4.5,
    ]);

    Club::create([
        'user_id' => 2,
        'name' => 'Cycling Squad',
        'description' => 'Cycling enthusiasts in Amman',
        'activity_type' => 'cycling',
        'location' => 'Amman',
        'rating' => 4.2,
    ]);

    Club::create([
        'user_id' => 1,
        'name' => 'Skate Life',
        'description' => 'Skating community in Amman',
        'activity_type' => 'skating',
        'location' => 'Amman',
        'rating' => 4.8,
    ]);
    }
}

