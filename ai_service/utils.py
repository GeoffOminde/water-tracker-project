# ai_service/utils.py
import joblib
import numpy as np
import os
from datetime import datetime
import json

SCALER_PATH = os.getenv("SCALER_PATH", "artifacts/scaler.joblib")

def load_scaler():
    return joblib.load(SCALER_PATH)

def preprocess_input(payload):
    """
    payload: dict with keys age, weight, activity, recent_avg, days_no_supply
    returns scaled numpy array shape (1, n_features)
    """
    scaler = load_scaler()
    arr = np.array([[payload.get("age", 30),
                     payload.get("weight", 70),
                     payload.get("activity", 1),
                     payload.get("recent_avg", 5.0),
                     payload.get("days_no_supply", 0)]], dtype=float)
    scaled = scaler.transform(arr)
    return scaled

# Simple logging to csv/json for retraining later
LOG_DIR = os.getenv("AI_LOG_DIR", "logs")
os.makedirs(LOG_DIR, exist_ok=True)

def log_request(payload, prediction):
    entry = {
        "ts": datetime.utcnow().isoformat(),
        "payload": payload,
        "prediction": float(prediction)
    }
    with open(os.path.join(LOG_DIR, "requests.log"), "a") as f:
        f.write(json.dumps(entry) + "\n")
