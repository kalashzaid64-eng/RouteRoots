import pandas as pd
import numpy as np
from sklearn.neural_network import MLPRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import pickle

# تحميل البيانات
df = pd.read_csv("training_data.csv")

# تحويل النصوص لأرقام
le_activity = LabelEncoder()
le_category = LabelEncoder()

df["user_activity_enc"] = le_activity.fit_transform(df["user_activity"])
df["user_category_enc"] = le_category.fit_transform(df["user_category_pref"])
df["product_activity_enc"] = le_activity.transform(df["product_activity"])
df["product_category_enc"] = le_category.transform(df["product_category"])

# تحديد الـ features والـ target
X = df[[
    "user_activity_enc",
    "user_category_enc",
    "product_activity_enc",
    "product_category_enc",
    "product_price",
    "product_views",
    "product_purchases",
    "product_rating",
    "same_activity",
    "same_category",
]].values

y = df["score"].values

# تقسيم البيانات
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# تطبيع البيانات
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# تدريب الموديل
model = MLPRegressor(
    hidden_layer_sizes=(128, 64, 32),
    activation="relu",
    max_iter=500,
    random_state=42
)
model.fit(X_train, y_train)

# تقييم الموديل
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"MSE: {mse:.4f}")

# حفظ الموديل
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("encoders.pkl", "wb") as f:
    pickle.dump({"activity": le_activity, "category": le_category}, f)

print("Model saved successfully!")