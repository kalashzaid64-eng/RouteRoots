<?php

namespace App\Services;

use App\Models\Achievement;
use App\Models\Activity;
use App\Models\User;

class AchievementService
{
    public static function check($userId)
    {
        $user = User::find($userId);

        // First Ride
        $ridesCount = $user->joinedRides()->count();
        if ($ridesCount >= 1) {
            self::give($userId, 'First Ride', 'Joined your first ride!');
        }

        // Club Member
        $clubsCount = $user->joinedClubs()->count();
        if ($clubsCount >= 1) {
            self::give($userId, 'Club Member', 'Joined your first club!');
        }

        // Social Butterfly
        if ($clubsCount >= 3) {
            self::give($userId, 'Social Butterfly', 'Joined 3 clubs!');
        }

        // حساب المسافات
        $runningDistance = Activity::where('user_id', $userId)->where('type', 'running')->sum('distance');
        $cyclingDistance = Activity::where('user_id', $userId)->where('type', 'cycling')->sum('distance');
        $totalDistance = Activity::where('user_id', $userId)->sum('distance');

        // 10K Runner
        if ($runningDistance >= 10) {
            self::give($userId, '10K Runner', 'Ran 10km total!');
        }

        // 50K Cyclist
        if ($cyclingDistance >= 50) {
            self::give($userId, '50K Cyclist', 'Cycled 50km total!');
        }

        // Skater
        $skatingCount = Activity::where('user_id', $userId)->where('type', 'skating')->count();
        if ($skatingCount >= 1) {
            self::give($userId, 'Skater', 'Completed your first skating activity!');
        }

        // Road Warrior
        if ($totalDistance >= 100) {
            self::give($userId, 'Road Warrior', 'Covered 100km total across all activities!');
        }

        // Made a Friend - أول متابعة (following)
        $followingCount = $user->following()->count();
        if ($followingCount >= 1) {
            self::give($userId, 'Made a Friend', 'Followed your first friend!');
        }

        // Popular - 5 متابعين
        $followersCount = $user->followers()->count();
        if ($followersCount >= 5) {
            self::give($userId, 'Popular', 'Gained 5 followers!');
        }
    }

    private static function give($userId, $title, $description)
    {
        $exists = Achievement::where('user_id', $userId)
            ->where('title', $title)
            ->exists();

        if (!$exists) {
            Achievement::create([
                'user_id' => $userId,
                'title' => $title,
                'description' => $description,
            ]);

            NotificationService::send($userId, 'achievement_unlocked', [
                'title' => $title,
                'description' => $description,
            ]);
        }
    }
}