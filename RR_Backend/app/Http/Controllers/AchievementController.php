<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use App\Services\NotificationService;

class AchievementController extends Controller
{
    public function index()
    {
        $achievements = Achievement::where('user_id', auth()->id())->get();
        return response()->json($achievements);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $achievement = Achievement::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
        ]);

        NotificationService::send(auth()->id(), 'achievement_unlocked', [
            'achievement_id' => $achievement->id,
            'title' => $achievement->title,
        ]);

        return response()->json([
            'message' => 'Achievement created successfully',
            'achievement' => $achievement,
        ]);
    }
}
