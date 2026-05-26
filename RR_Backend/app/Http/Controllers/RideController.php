<?php

namespace App\Http\Controllers;

use App\Models\Ride;
use Illuminate\Http\Request;

class RideController extends Controller
{
    public function index()
    {
        $rides = Ride::with('organizer')->get();
        return response()->json($rides);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'activity_type' => 'required|in:running,cycling,skating',
            'location' => 'required|string',
            'distance' => 'required|numeric',
            'fee' => 'nullable|numeric',
            'ride_date' => 'required|date',
        ]);

        $ride = Ride::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'activity_type' => $request->activity_type,
            'location' => $request->location,
            'distance' => $request->distance,
            'fee' => $request->fee,
            'ride_date' => $request->ride_date,
        ]);

        return response()->json([
            'message' => 'Ride created successfully',
            'ride' => $ride,
        ]);
    }

    public function show($id)
    {
        $ride = Ride::with('organizer', 'participants')->findOrFail($id);
        return response()->json($ride);
    }

    public function update(Request $request, $id)
    {
        $ride = Ride::findOrFail($id);

        if ($ride->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $ride->update($request->all());

        return response()->json([
            'message' => 'Ride updated successfully',
            'ride' => $ride,
        ]);
    }

    public function destroy($id)
    {
        $ride = Ride::findOrFail($id);

        if ($ride->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $ride->delete();

        return response()->json([
            'message' => 'Ride deleted successfully',
        ]);
    }

    public function join($id)
    {
        $ride = Ride::findOrFail($id);
        $ride->participants()->attach(auth()->id());

        return response()->json([
            'message' => 'Joined ride successfully',
        ]);
    }
    public function leave($id)
{
    $ride = Ride::findOrFail($id);
    $ride->participants()->detach(auth()->id());

    return response()->json([
        'message' => 'Left ride successfully',
    ]);
}
}

