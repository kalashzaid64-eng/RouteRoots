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
            'avatar' => 'sometimes|string',
        ]);

        $user->update($request->only('name', 'bio', 'location', 'avatar'));

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
}
