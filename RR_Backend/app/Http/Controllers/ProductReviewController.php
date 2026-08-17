<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    // إضافة أو تعديل تقييم
    public function store(Request $request, $productId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $product = Product::findOrFail($productId);

        $review = ProductReview::updateOrCreate(
            [
                'product_id' => $productId,
                'user_id' => auth()->id(),
            ],
            [
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]
        );

        return response()->json([
            'message' => 'Review saved successfully',
            'review' => $review,
        ]);
    }

    // جيب كل تقييمات منتج معين
    public function index($productId)
    {
        $product = Product::findOrFail($productId);

        $reviews = $product->reviews()->with('user:id,name,avatar')->orderBy('created_at', 'desc')->get();

        return response()->json($reviews);
    }

        // حذف تقييم
    public function destroy($productId)
    {
        $review = ProductReview::where('product_id', $productId)
            ->where('user_id', auth()->id())
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }

}