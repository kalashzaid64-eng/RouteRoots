<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationSettingsController extends Controller
{
    // الأنواع المتاحة للتحكم فيها
    protected $availableTypes = [
        'ride_join_request',
        'ride_request_accepted',
        'ride_request_rejected',
        'new_ride_nearby',
        'new_ride_for_club',
        'achievement_unlocked',
        'new_follower',
        'friend_joined_club',
        'friend_joined_ride',
    ];

    // جيب الإعدادات الحالية
    public function index()
    {
        $user = auth()->user();
        $settings = $user->notification_settings ?? [];

        // نرجع كل الأنواع، حتى يلي ما انعدلت (افتراضياً true)
        $result = [];
        foreach ($this->availableTypes as $type) {
            $result[$type] = $settings[$type] ?? true;
        }

        return response()->json($result);
    }

    // حدّث إعداد أو أكتر
    public function update(Request $request)
    {
        $request->validate([
            'settings' => 'required|array',
        ]);

        $user = auth()->user();
        $current = $user->notification_settings ?? [];

        foreach ($request->settings as $type => $value) {
            if (in_array($type, $this->availableTypes)) {
                $current[$type] = (bool) $value;
            }
        }

        $user->update(['notification_settings' => $current]);

        return response()->json([
            'message' => 'Notification settings updated successfully',
            'settings' => $current,
        ]);
    }
}
