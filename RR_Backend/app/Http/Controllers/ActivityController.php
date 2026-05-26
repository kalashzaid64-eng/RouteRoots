<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::where('user_id', auth()->id())->get();
        return response()->json($activities);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:running,cycling,skating',
            'distance' => 'required|numeric',
            'duration' => 'required|integer',
            'date' => 'required|date',
        ]);

        $activity = Activity::create([
            'user_id' => auth()->id(),
            'type' => $request->type,
            'distance' => $request->distance,
            'duration' => $request->duration,
            'date' => $request->date,
        ]);

        return response()->json([
            'message' => 'Activity created successfully',
            'activity' => $activity,
        ]);
    }
}
