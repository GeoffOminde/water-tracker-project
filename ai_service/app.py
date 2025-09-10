from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow import keras
import os
from utils import preprocess_input, log_request

MODEL_PATH = os.getenv("MODEL_PATH", "artifacts/water_model.keras")

app = Flask(__name__)

# Load model at startup
model = keras.models.load_model(MODEL_PATH, compile=False)

@app.route("/", methods=["GET"])
def root():
    return jsonify({"status": "Water Tracker AI Service Running 🚰"})

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_loaded": True})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    if not data:
        return jsonify({"error": "no input"}), 400
    try:
        X = preprocess_input(data)
        pred = model.predict(X)
        value = float(pred[0][0])
        # log for retraining
        log_request(data, value)
        return jsonify({"recommended_liters": round(value, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
