<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        Achievement::create([
            'user_id' => 1,
            'title' => 'First Ride',
            'description' => 'Completed your first ride!',
        ]);

        Achievement::create([
            'user_id' => 1,
            'title' => 'Century Rider',
            'description' => 'Cycled 100km total!',
        ]);

        Achievement::create([
            'user_id' => 2,
            'title' => 'Club Member',
            'description' => 'Joined your first club!',
        ]);

        Achievement::create([
            'user_id' => 2,
            'title' => 'First 5K',
            'description' => 'Ran 5km for the first time!',
        ]);
    }
}