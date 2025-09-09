# Water Usage Tracker MVP

A lean, offline-first water usage tracker for households and small landlords in Nakuru. Built with **FastAPI** backend and **React Native Expo** frontend.

---

## Features
- User registration / login (phone-based)
- Properties management
- Meters management
- Modular architecture ready for OCR, readings, alerts, and offline-first caching

---

## Backend Setup (Docker)

1. Clone the repository:
```bash
git clone <repo-url>
cd water-tracker-backend
```
2. Create .env file:
```bash
env
Copy code
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=watertracker
POSTGRES_HOST=db
```
3. Run Docker containers:

```bash
Copy code
docker-compose up --build
```
4. Access API: http://localhost:8000
Swagger docs: http://localhost:8000/docs

##   Frontend Setup (Expo)
1. Install dependencies:

```bash
Copy code
cd water-tracker-app
npm install
```
2. Run Expo:

```bash
Copy code
npm start
```
3. Open in Android/iOS simulator or physical device (Expo Go app)

## Notes
Backend database host in .env must match Docker service name (db)

Frontend API baseURL must point to emulator/device IP

Ready to expand with:

Daily readings

OCR / photo capture

Offline caching

Alerts and notifications

yaml
Copy code

---

This gives you a **fully working starter project**:

- `docker-compose up` spins up **PostgreSQL + FastAPI backend**  
- Expo app runs on **Android/iOS** and connects to the backend  
- `.env` example included for both backend and database  
- README provides clear setup instructions  
