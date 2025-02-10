import os
import requests
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from Spring Boot frontend

# Connect to MySQL (Modify credentials if needed)
db = mysql.connector.connect(
    host="localhost",  # Use "mysql" when running inside Docker
    user="root",
    password="root",
    database="db"
)
cursor = db.cursor(dictionary=True)

# 🔹 Store predefined responses
store_info = {
    "location": "Our store is at 123 Main Street, New York.",
    "hot_sale": "This week’s hot sale: iPhone 15 - $100 OFF!"
}

@app.route("/chat", methods=["POST"])
def chat():
    query = request.json.get("query", "")

    # 🔹 Step 1: Detect Intent (Use Ollama)
    intent_prompt = f"""
    Classify this customer question into one category:
    1. "product_info" - If they ask about a product's price or availability.
    2. "order_tracking" - If they ask about order status.
    3. "store_location" - If they ask where the store is.
    4. "hot_sale" - If they ask about promotions.
    5. "general" - For other questions.
    Customer Question: "{query}"
    """

    intent_response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "deepseek-r1:1.5b", "prompt": intent_prompt, "stream": False}
    )
    intent = intent_response.json().get("response", "").strip().lower()

    # 🔹 Step 2: Handle Product Info Requests
    if intent == "product_info":
        product_response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "deepseek-r1:1.5b", "prompt": f"Extract the product name from this: {query}", "stream": False}
        )
        product_name = product_response.json().get("response", "").strip()

        cursor.execute("SELECT * FROM products WHERE name LIKE %s", (f"%{product_name}%",))
        product = cursor.fetchone()

        if product:
            return jsonify({"response": f"{product['name']} costs {product['price']} USD. Stock: {product['stock']}."})
        return jsonify({"response": "Sorry, I couldn't find that product."})

    # 🔹 Step 3: Handle Order Tracking Requests
    elif intent == "order_tracking":
        order_id = "".join(filter(str.isdigit, query))  # Extract order number
        cursor.execute("SELECT * FROM orders WHERE order_id = %s", (order_id,))
        order = cursor.fetchone()

        if order:
            return jsonify({"response": f"Your order {order['order_id']} is currently {order['status']}. Expected delivery: {order['delivery_date']}."})
        return jsonify({"response": "Sorry, I couldn't find your order. Please check your order number."})

    # 🔹 Step 4: Handle Store Location Requests
    elif intent == "store_location":
        return jsonify({"response": store_info["location"]})

    # 🔹 Step 5: Handle Promotions / Hot Sales Requests
    elif intent == "hot_sale":
        return jsonify({"response": store_info["hot_sale"]})

    # 🔹 Step 6: Handle General Questions Using AI
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "deepseek-r1:1.5b", "prompt": f"Answer this briefly (under 20 words): {query}", "stream": False}
    )

    return jsonify({"response": response.json()["response"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
