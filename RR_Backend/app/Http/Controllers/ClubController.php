<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;
use App\Services\NotificationService;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::with('creator', 'members')->withCount('members')->get();
        return response()->json($clubs);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'activity_type' => 'required|in:running,cycling,skating',
            'location' => 'nullable|string',
            'rating' => 'nullable|numeric',
        ]);

        $club = Club::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'description' => $request->description,
            'activity_type' => $request->activity_type,
            'location' => $request->location,
            'rating' => $request->rating,
        ]);

        $club->members()->attach(auth()->id()); // ← هون بس

        return response()->json([
            'message' => 'Club created successfully',
            'club' => $club,
        ]);
    }

    public function show($id)
    {
    $club = Club::with('creator', 'members')->withCount('members')->findOrFail($id);
    return response()->json($club);
    }


    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);

        if ($club->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $club->update($request->all());

        return response()->json([
            'message' => 'Club updated successfully',
            'club' => $club,
        ]);
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);

        if ($club->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $club->delete();

        return response()->json([
            'message' => 'Club deleted successfully',
        ]);
    }

    public function join($id)
    {
        $club = Club::findOrFail($id);
        
        $alreadyMember = $club->members()->where('user_id', auth()->id())->exists();
        
        if ($alreadyMember) {
            return response()->json([
                'message' => 'You are already a member of this club',
            ], 422);
        }
        
        $club->members()->attach(auth()->id());
        
        \App\Services\AchievementService::check(auth()->id());


        return response()->json([
            'message' => 'Joined club successfully',
        ]);
    }
    public function leave($id)
    {
        $club = Club::findOrFail($id);

        if ($club->user_id === auth()->id()) {
            return response()->json([
                'message' => 'You are the owner, you cannot leave. Delete the club instead.',
            ], 422);
        }

        $club->members()->detach(auth()->id());

        return response()->json([
            'message' => 'Left club successfully',
        ]);
    }
}