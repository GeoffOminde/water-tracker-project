# Water Usage Tracker MVP

A lean, offline-first water usage tracker for households and small landlords in Nakuru. Built with **FastAPI** backend and **React Native Expo** frontend.

---

## About / SDG Impact

**Water usage tracking app for households and small landlords**  
I am building for real people in Nakuru who live with water uncertainty. This MVP starts with **one thing that’s useful on day one, measurable within weeks, and expandable into IoT and city-scale later**:  

- A lean, offline-first water usage tracker that helps households and small landlords:
  - Cut water waste
  - Spot leaks fast
  - Plan and manage bills  
- No smart meters required at the start  

**SDG Alignment:** This project contributes directly to **[Sustainable Development Goal 6: Clean Water and Sanitation](https://sdgs.un.org/goals/goal6)** by promoting responsible water usage, leak detection, and conservation at the household and small-property level.  

---

## Features
- User registration / login (phone-based)
- Properties management
- Meters management
- Modular architecture ready for OCR, readings, alerts, and offline-first caching
- Multi-language support (English / Swahili)

---

## Backend Setup (Docker)

1. Clone the repository:
```bash
git clone <repo-url>
cd water-tracker-backend

```
2. Create .env file:
```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=watertracker
POSTGRES_HOST=db
```
3. Run Docker containers:

```bash
docker-compose up --build
```
4. Access API: http://localhost:8000
Swagger docs: http://localhost:8000/docs

##   Frontend Setup (Expo)
1. Install dependencies:

```bash
cd water-tracker-app
npm install
```
2. Run Expo:

```bash
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
