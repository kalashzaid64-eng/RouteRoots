<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Running Shoes', 'price' => 99.99, 'discount' => 10, 'category' => 'Footwear', 'activity_type' => 'running', 'views' => 320, 'purchases' => 85, 'rating' => 4.5],
            ['name' => 'Running Shorts', 'price' => 29.99, 'discount' => 0, 'category' => 'Clothing', 'activity_type' => 'running', 'views' => 210, 'purchases' => 60, 'rating' => 4.2],
            ['name' => 'Running Socks', 'price' => 9.99, 'discount' => 5, 'category' => 'Clothing', 'activity_type' => 'running', 'views' => 180, 'purchases' => 95, 'rating' => 4.0],
            ['name' => 'Sport Water Bottle', 'price' => 15.99, 'discount' => 0, 'category' => 'Accessories', 'activity_type' => 'running', 'views' => 150, 'purchases' => 40, 'rating' => 3.8],
            ['name' => 'Running Belt', 'price' => 19.99, 'discount' => 10, 'category' => 'Accessories', 'activity_type' => 'running', 'views' => 130, 'purchases' => 35, 'rating' => 3.9],

            ['name' => 'Cycling Helmet', 'price' => 49.99, 'discount' => 0, 'category' => 'Safety', 'activity_type' => 'cycling', 'views' => 280, 'purchases' => 70, 'rating' => 4.7],
            ['name' => 'Cycling Gloves', 'price' => 24.99, 'discount' => 5, 'category' => 'Clothing', 'activity_type' => 'cycling', 'views' => 200, 'purchases' => 55, 'rating' => 4.3],
            ['name' => 'Bike Water Bottle', 'price' => 12.99, 'discount' => 0, 'category' => 'Accessories', 'activity_type' => 'cycling', 'views' => 160, 'purchases' => 45, 'rating' => 4.0],
            ['name' => 'Cycling Jersey', 'price' => 59.99, 'discount' => 15, 'category' => 'Clothing', 'activity_type' => 'cycling', 'views' => 240, 'purchases' => 65, 'rating' => 4.4],
            ['name' => 'Cycling Shorts', 'price' => 39.99, 'discount' => 10, 'category' => 'Clothing', 'activity_type' => 'cycling', 'views' => 190, 'purchases' => 50, 'rating' => 4.1],

            ['name' => 'Skating Pads', 'price' => 29.99, 'discount' => 15, 'category' => 'Safety', 'activity_type' => 'skating', 'views' => 170, 'purchases' => 45, 'rating' => 4.2],
            ['name' => 'Skating Helmet', 'price' => 44.99, 'discount' => 0, 'category' => 'Safety', 'activity_type' => 'skating', 'views' => 155, 'purchases' => 40, 'rating' => 4.5],
            ['name' => 'Skating Shoes', 'price' => 89.99, 'discount' => 10, 'category' => 'Footwear', 'activity_type' => 'skating', 'views' => 200, 'purchases' => 55, 'rating' => 4.3],
            ['name' => 'Skating Socks', 'price' => 11.99, 'discount' => 0, 'category' => 'Clothing', 'activity_type' => 'skating', 'views' => 120, 'purchases' => 35, 'rating' => 3.7],
            ['name' => 'Skating Bag', 'price' => 34.99, 'discount' => 5, 'category' => 'Accessories', 'activity_type' => 'skating', 'views' => 140, 'purchases' => 38, 'rating' => 3.9],
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, ['image' => null]));
        }
    }
}

