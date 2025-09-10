# ai_service/Dockerfile
FROM python:3.10-slim

WORKDIR /app

# system deps (if needed)
RUN apt-get update && apt-get install -y build-essential git && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port used by Flask
ENV PORT=5001
EXPOSE 5001

CMD ["gunicorn", "-b", "0.0.0.0:5001", "app:app", "--workers", "1", "--threads", "2"]
