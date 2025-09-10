// testPredict.js
const predictWater = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: 28,
        weight: 70,
        activity: 2,
        recent_avg: 3.5,
        days_no_supply: 1,
      }),
    });
    const data = await response.json();
    console.log("Recommended liters:", data.recommended_liters);
  } catch (err) {
    console.error("Error:", err);
  }
};

// Run test
predictWater();
