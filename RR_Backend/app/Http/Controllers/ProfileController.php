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
}