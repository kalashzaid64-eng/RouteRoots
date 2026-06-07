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
        ]);

        Club::create([
            'user_id' => 2,
            'name' => 'Cycling Squad',
            'description' => 'Cycling enthusiasts in Amman',
            'activity_type' => 'cycling',
        ]);

        Club::create([
            'user_id' => 1,
            'name' => 'Skate Life',
            'description' => 'Skating community in Amman',
            'activity_type' => 'skating',
        ]);
    }
}

