<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $request->validate([
            'name' => 'sometimes|string',
            'bio' => 'sometimes|string',
            'location' => 'sometimes|string',
            'avatar' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            'activities' => 'sometimes|string',
        ]);

        $data = $request->only('name', 'bio', 'location', 'activities');

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = asset('storage/' . $path);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
    public function stats()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        $totalRides = $user->joinedRides()->count();
        $totalDistance = $user->activities()->sum('distance');
        $totalDuration = $user->activities()->sum('duration');

        return response()->json([
            'total_rides' => $totalRides,
            'total_distance' => $totalDistance,
            'total_duration' => $totalDuration,
        ]);
    }
}