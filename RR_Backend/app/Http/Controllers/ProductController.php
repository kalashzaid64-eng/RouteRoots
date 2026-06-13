<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'discount' => 'nullable|integer',
            'category' => 'required|string',
            'activity_type' => 'required|in:running,cycling,skating',
            'image' => 'nullable|string',
        ]);

        $product = Product::create($request->all());

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ]);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        $product->increment('views');
        return response()->json($product);
    }
    public function recommend(Request $request)
    {
        $user = auth()->user();

        $products = Product::all()->map(function ($product) {
            return [
                'id' => $product->id,
                'category' => $product->category,
                'activity_type' => $product->activity_type,
                'price' => (float) $product->price,
                'views' => (int) $product->views,
                'purchases' => (int) $product->purchases,
                'rating' => (float) $product->rating,
            ];
        });

        $payload = [
            'user_activity' => explode(',', $user->activities ?? 'running')[0],
            'user_category_pref' => ucfirst(strtolower($request->get('category', 'Footwear'))),
            'products' => $products,
        ];

        $response = Http::post('http://127.0.0.1:5000/recommend', $payload);

        if ($response->failed()) {
            return response()->json(['error' => 'Recommendation service unavailable'], 503);
        }

        $recommendations = $response->json()['recommendations'];

        $recommendedIds = collect($recommendations)->pluck('product_id');
        $recommendedProducts = Product::whereIn('id', $recommendedIds)->get()->keyBy('id');

        $result = collect($recommendations)->map(function ($rec) use ($recommendedProducts) {
            $product = $recommendedProducts[$rec['product_id']];
            return [
                'product' => $product,
                'score' => $rec['score'],
            ];
        });

        return response()->json(['recommendations' => $result]);
    }
}