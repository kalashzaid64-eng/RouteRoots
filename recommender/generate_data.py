import pandas as pd
import numpy as np
import random

random.seed(42)
np.random.seed(42)

activity_types = ["running", "cycling", "skating"]
categories = ["Footwear", "Clothing", "Accessories", "Safety"]

products = [
    {"id": 1,  "category": "Footwear",    "activity_type": "running", "price": 99.99, "views": 320, "purchases": 85, "rating": 4.5},
    {"id": 2,  "category": "Clothing",    "activity_type": "running", "price": 29.99, "views": 210, "purchases": 60, "rating": 4.2},
    {"id": 3,  "category": "Clothing",    "activity_type": "running", "price": 9.99,  "views": 180, "purchases": 95, "rating": 4.0},
    {"id": 4,  "category": "Accessories", "activity_type": "running", "price": 15.99, "views": 150, "purchases": 40, "rating": 3.8},
    {"id": 5,  "category": "Accessories", "activity_type": "running", "price": 19.99, "views": 130, "purchases": 35, "rating": 3.9},
    {"id": 6,  "category": "Safety",      "activity_type": "cycling", "price": 49.99, "views": 280, "purchases": 70, "rating": 4.7},
    {"id": 7,  "category": "Clothing",    "activity_type": "cycling", "price": 24.99, "views": 200, "purchases": 55, "rating": 4.3},
    {"id": 8,  "category": "Accessories", "activity_type": "cycling", "price": 12.99, "views": 160, "purchases": 45, "rating": 4.0},
    {"id": 9,  "category": "Clothing",    "activity_type": "cycling", "price": 59.99, "views": 240, "purchases": 65, "rating": 4.4},
    {"id": 10, "category": "Clothing",    "activity_type": "cycling", "price": 39.99, "views": 190, "purchases": 50, "rating": 4.1},
    {"id": 11, "category": "Safety",      "activity_type": "skating", "price": 29.99, "views": 170, "purchases": 45, "rating": 4.2},
    {"id": 12, "category": "Safety",      "activity_type": "skating", "price": 44.99, "views": 155, "purchases": 40, "rating": 4.5},
    {"id": 13, "category": "Footwear",    "activity_type": "skating", "price": 89.99, "views": 200, "purchases": 55, "rating": 4.3},
    {"id": 14, "category": "Clothing",    "activity_type": "skating", "price": 11.99, "views": 120, "purchases": 35, "rating": 3.7},
    {"id": 15, "category": "Accessories", "activity_type": "skating", "price": 34.99, "views": 140, "purchases": 38, "rating": 3.9},
]

rows = []
for _ in range(5000):
    user_activity = random.choice(activity_types)
    user_category_pref = random.choice(categories)
    product = random.choice(products)

    same_activity = 1 if product["activity_type"] == user_activity else 0
    same_category = 1 if product["category"] == user_category_pref else 0
    price_score = 1 - (product["price"] / 100)

    # تطبيع الـ views والـ purchases والـ rating
    views_score = min(product["views"] / 500, 1.0)
    purchases_score = min(product["purchases"] / 100, 1.0)
    rating_score = product["rating"] / 5.0

    score = (
        same_activity    * 0.40 +
        same_category    * 0.20 +
        purchases_score  * 0.20 +
        rating_score     * 0.10 +
        views_score      * 0.05 +
        price_score      * 0.05
    )
    score += np.random.normal(0, 0.05)
    score = round(min(max(score, 0), 1), 4)

    rows.append({
        "user_activity": user_activity,
        "user_category_pref": user_category_pref,
        "product_id": product["id"],
        "product_activity": product["activity_type"],
        "product_category": product["category"],
        "product_price": product["price"],
        "product_views": product["views"],
        "product_purchases": product["purchases"],
        "product_rating": product["rating"],
        "same_activity": same_activity,
        "same_category": same_category,
        "score": score,
    })

df = pd.DataFrame(rows)
df.to_csv("training_data.csv", index=False)
print(f"Generated {len(df)} rows")
print(df.head())