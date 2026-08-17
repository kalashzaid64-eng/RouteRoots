<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'discount',
        'category',
        'activity_type',
        'image',
        'views',
        'purchases',
        'rating',
    ];

        public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

}