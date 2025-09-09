from fastapi import FastAPI
from app.routers import users, properties, meters
from app.database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Water Usage Tracker API")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(properties.router, prefix="/properties", tags=["Properties"])
app.include_router(meters.router, prefix="/meters", tags=["Meters"])

@app.get("/")
def root():
    return {"message": "Water Usage Tracker API is running"}
