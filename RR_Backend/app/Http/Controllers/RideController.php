<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\Ride;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class RideController extends Controller
{
    public function index(Request $request)
    {
        $query = Ride::with('organizer');

        if ($request->has('activity_type')) {
            $query->where('activity_type', $request->activity_type);
        }

        $rides = $query->get();
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
            'duration' => 'nullable|integer',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'club_id' => 'required|exists:clubs,id',
        ]);

        $club = Club::findOrFail($request->club_id);

        $isMember = $club->members()->where('user_id', auth()->id())->exists();
        $isOwner = $club->user_id === auth()->id();

        if (!$isMember && !$isOwner) {
            return response()->json([
                'message' => 'You must be a member or owner of this club to create a ride',
            ], 403);
        }

        $ride = Ride::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'activity_type' => $request->activity_type,
            'location' => $request->location,
            'distance' => $request->distance,
            'fee' => $request->fee,
            'ride_date' => $request->ride_date,
            'duration' => $request->duration,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'club_id' => $request->club_id,
        ]);

        // إشعار للناس القريبين
        $nearbyUsers = User::where('id', '!=', auth()->id())
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance_km", [$ride->latitude, $ride->longitude, $ride->latitude])
            ->having('distance_km', '<=', 10)
            ->get();

        foreach ($nearbyUsers as $user) {
            NotificationService::send($user->id, 'new_ride_nearby', [
                'ride_id' => $ride->id,
                'title' => $ride->title,
                'location' => $ride->location,
            ]);
        }

        // إشعار لأعضاء الـ clubs اللي عندهم نفس نوع النشاط
        $clubs = \App\Models\Club::where('activity_type', $ride->activity_type)->with('members')->get();

        foreach ($clubs as $club) {
            foreach ($club->members as $member) {
                if ($member->id !== auth()->id()) {
                    NotificationService::send($member->id, 'new_ride_for_club', [
                        'ride_id' => $ride->id,
                        'title' => $ride->title,
                        'club_id' => $club->id,
                        'club_name' => $club->name,
                    ]);
                }
            }
        }

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

        NotificationService::send($ride->user_id, 'ride_joined', [
            'ride_id' => $ride->id,
            'title' => $ride->title,
            'joined_by' => auth()->user()->name,
        ]);

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
public function nearby(Request $request)
{
    $request->validate([
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
        'radius' => 'nullable|numeric',
    ]);

    $lat = $request->latitude;
    $lng = $request->longitude;
    $radius = $request->radius ?? 10; // كم افتراضي

    $rides = Ride::with('organizer')
        ->whereNotNull('latitude')
        ->whereNotNull('longitude')
        ->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance_km", [$lat, $lng, $lat])
        ->having('distance_km', '<=', $radius)
        ->orderBy('distance_km')
        ->get();

    return response()->json($rides);
}
}

