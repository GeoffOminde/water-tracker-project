import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras import layers, metrics
import os
import joblib
from sklearn.preprocessing import StandardScaler

# Dummy example dataset generator (replace with real data later)
def generate_synthetic_data(n=2000, seed=42):
    np.random.seed(seed)
    age = np.random.randint(10, 80, size=n)
    weight = np.random.normal(70, 15, size=n).clip(35, 140)
    activity = np.random.randint(0, 4, size=n)  # 0 none - 3 very active
    recent_avg = np.random.normal(5, 2, size=n).clip(0.5, 20)  # liters/day
    days_no_supply = np.random.poisson(2, size=n)
    # Simple target function with noise
    base = (
        1.5
        + 0.03 * (weight - 60)
        + 0.01 * (age - 30)
        + 0.6 * activity
        + 0.1 * recent_avg
        + 0.2 * np.log1p(days_no_supply)
    )
    noise = np.random.normal(0, 0.3, size=n)
    target = (base + noise).clip(0.5, 10)
    df = pd.DataFrame({
        "age": age,
        "weight": weight,
        "activity": activity,
        "recent_avg": recent_avg,
        "days_no_supply": days_no_supply,
        "target": target
    })
    return df

def build_and_train(save_path="artifacts/water_model.keras"):
    # Generate training data
    df = generate_synthetic_data(2000)
    X = df[["age", "weight", "activity", "recent_avg", "days_no_supply"]].values
    y = df["target"].values

    # Normalize features
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)

    # Save scaler
    os.makedirs("artifacts", exist_ok=True)
    joblib.dump(scaler, "artifacts/scaler.joblib")

    # ✅ Use input shape from features
    input_shape = (Xs.shape[1],)

    # Build model
    model = tf.keras.Sequential([
        layers.Input(shape=input_shape),
        layers.Dense(64, activation="relu"),
        layers.Dense(32, activation="relu"),
        layers.Dense(1, activation="linear")
    ])
    model.compile(
    optimizer='adam',
    loss=tf.keras.losses.MeanSquaredError(),   # <-- proper loss
    metrics=[tf.keras.metrics.MeanSquaredError()]
)

    # Train
    model.fit(Xs, y, epochs=30, batch_size=32, validation_split=0.12, verbose=1)

    # Save model
    model.save(save_path)
    print(f"✅ Model trained and saved to {save_path}")

if __name__ == "__main__":
    build_and_train()
