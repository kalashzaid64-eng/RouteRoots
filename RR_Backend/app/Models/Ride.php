<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = [
    'user_id',
    'club_id',
    'title',
    'activity_type',
    'location',
    'distance',
    'fee',
    'ride_date',
    'duration',
    'latitude',
    'longitude',
    ];

    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function organizer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class);
    }
}