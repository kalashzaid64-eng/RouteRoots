<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    // متابعة مستخدم
    public function follow($id)
    {
        $userId = auth()->id();

        if ($userId == $id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        $target = User::findOrFail($id);

        $alreadyFollowing = $target->followers()->where('follower_id', $userId)->exists();

        if ($alreadyFollowing) {
            return response()->json(['message' => 'Already following'], 400);
        }

        $target->followers()->attach($userId);

        NotificationService::send($id, 'new_follower', [
            'follower_id' => $userId,
            'follower_name' => auth()->user()->name,
        ]);

        return response()->json(['message' => 'Followed successfully']);
    }

    // إلغاء متابعة
    public function unfollow($id)
    {
        $userId = auth()->id();
        $target = User::findOrFail($id);

        $target->followers()->detach($userId);

        return response()->json(['message' => 'Unfollowed successfully']);
    }

    // صفحة بروفايل شخص معين
    public function show($id)
    {
        $user = User::findOrFail($id);
        $currentUserId = auth()->id();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'bio' => $user->bio,
            'location' => $user->location,
            'activities' => $user->activities,
            'avatar' => $user->avatar,
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->following()->count(),
            'is_following' => $user->followers()->where('follower_id', $currentUserId)->exists(),
        ]);
    }

    // لائحة المتابعين
    public function followers($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->followers()->get(['users.id', 'name', 'avatar', 'bio']));
    }

    // لائحة يلي بيتابعهم
    public function following($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->following()->get(['users.id', 'name', 'avatar', 'bio']));
    }
}