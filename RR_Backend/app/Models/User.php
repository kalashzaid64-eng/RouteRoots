<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements \PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'bio',
        'location',
        'activities',
        'avatar',
        'latitude',
        'longitude',
        'notification_settings',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'notification_settings' => 'array',
        ];
    }
        public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function rides()
    {
        return $this->hasMany(Ride::class);
    }

    public function clubs()
    {
        return $this->hasMany(Club::class);
    }

    public function achievements()
    {
        return $this->hasMany(Achievement::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function joinedClubs()
    {
        return $this->belongsToMany(Club::class);
    }

    public function joinedRides()
    {
        return $this->belongsToMany(Ride::class);
    }

    public function following()
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id')->withTimestamps();
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id')->withTimestamps();
    }

    public function wantsNotification($type)
    {
        $settings = $this->notification_settings ?? [];
        return $settings[$type] ?? true;
    }
}
