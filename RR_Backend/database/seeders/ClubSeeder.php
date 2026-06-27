<?php

namespace Database\Seeders;

use App\Models\Club;
use Illuminate\Database\Seeder;

class ClubSeeder extends Seeder
{
    public function run(): void
    {
        $club1 = Club::create([
            'user_id' => 1,
            'name' => 'Damascus Runners',
            'description' => 'Running club in Damascus',
            'activity_type' => 'running',
            'location' => 'Damascus',
            'rating' => 4.5,
        ]);
        $club1->members()->attach([1, 2]);

        $club2 = Club::create([
            'user_id' => 2,
            'name' => 'Cycling Squad',
            'description' => 'Cycling enthusiasts in Damascus',
            'activity_type' => 'cycling',
            'location' => 'Damascus',
            'rating' => 4.2,
        ]);
        $club2->members()->attach([1, 2]);

        $club3 = Club::create([
            'user_id' => 1,
            'name' => 'Skate Life',
            'description' => 'Skating community in Damascus',
            'activity_type' => 'skating',
            'location' => 'Damascus',
            'rating' => 4.8,
        ]);
        $club3->members()->attach([1, 2]);
    }
}
