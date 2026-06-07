<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Zaid',
            'email' => 'zaid@test.com',
            'password' => Hash::make('123456'),
            'bio' => 'I love running!',
            'location' => 'Amman',
            'activities' => 'running',
        ]);

        User::create([
            'name' => 'Bayan',
            'email' => 'bayan@test.com',
            'password' => Hash::make('123456'),
            'bio' => 'Cycling enthusiast!',
            'location' => 'Amman',
            'activities' => 'cycling',
        ]);
    }
}
