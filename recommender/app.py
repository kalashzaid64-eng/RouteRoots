from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# تحميل الموديل والأدوات
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("encoders.pkl", "rb") as f:
    encoders = pickle.load(f)

le_activity = encoders["activity"]
le_category = encoders["category"]

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_activity = data.get("user_activity")
    user_category = data.get("user_category_pref")
    products = data.get("products")

    if not user_activity or not user_category or not products:
        return jsonify({"error": "user_activity, user_category_pref, and products are required"}), 400

    scores = []
    for product in products:
        same_activity = 1 if product["activity_type"] == user_activity else 0
        same_category = 1 if product["category"] == user_category else 0

        features = np.array([[
            le_activity.transform([user_activity])[0],
            le_category.transform([user_category])[0],
            le_activity.transform([product["activity_type"]])[0],
            le_category.transform([product["category"]])[0],
            product["price"],
            product["views"],
            product["purchases"],
            product["rating"],
            same_activity,
            same_category,
        ]])

        features = scaler.transform(features)
        score = model.predict(features)[0]
        scores.append({
            "product_id": product["id"],
            "score": round(float(score), 4)
        })

    scores.sort(key=lambda x: x["score"], reverse=True)
    top5 = scores[:5]

    return jsonify({"recommendations": top5})

if __name__ == "__main__":
    app.run(debug=True, port=5000)