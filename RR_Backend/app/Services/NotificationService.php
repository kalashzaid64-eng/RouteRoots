<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    public static function send($userId, $type, $data = [])
    {
        $user = User::find($userId);

        if (!$user || !$user->wantsNotification($type)) {
            return;
        }

        Notification::create([
            'user_id' => $userId,
            'type'    => $type,
            'data'    => $data,
        ]);
    }
}