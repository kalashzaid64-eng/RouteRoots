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
        'avatar',
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
}
