# test_predict.py
import requests

url = "http://127.0.0.1:5001/predict"

payload = {
    "age": 28,
    "weight": 70,
    "activity": 2,
    "recent_avg": 3.5,
    "days_no_supply": 1
}

res = requests.post(url, json=payload)
print("Response:", res.json())
