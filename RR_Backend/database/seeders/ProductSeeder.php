<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Running Shoes',
            'price' => 99.99,
            'discount' => 10,
            'category' => 'Footwear',
            'activity_type' => 'running',
            'image' => null,
        ]);

        Product::create([
            'name' => 'Cycling Helmet',
            'price' => 49.99,
            'discount' => 0,
            'category' => 'Safety',
            'activity_type' => 'cycling',
            'image' => null,
        ]);

        Product::create([
            'name' => 'Skating Pads',
            'price' => 29.99,
            'discount' => 15,
            'category' => 'Safety',
            'activity_type' => 'skating',
            'image' => null,
        ]);

        Product::create([
            'name' => 'Sport Water Bottle',
            'price' => 15.99,
            'discount' => 0,
            'category' => 'Accessories',
            'activity_type' => 'running',
            'image' => null,
        ]);
    }
}

