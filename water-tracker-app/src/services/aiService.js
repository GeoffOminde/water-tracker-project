export const predictWater = async (userData) => {
  try {
    const response = await fetch("http://192.168.100.156:5001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    return data.recommended_liters;
  } catch (err) {
    console.error("Prediction error:", err);
    throw err;
  }
};
