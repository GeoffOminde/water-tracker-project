from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from .. import schemas, models, deps

router = APIRouter()

# Create a reading
@router.post("/", response_model=schemas.Reading)
def create_reading(reading: schemas.ReadingCreate, db: Session = Depends(deps.get_db)):
    db_reading = models.Reading(
        meter_id=reading.meter_id,
        reading_value=reading.reading_value,
        reading_time=reading.reading_time or datetime.utcnow(),
        source=reading.source,
        confidence=reading.confidence,
        reading_photo_url=reading.reading_photo_url
    )
    db.add(db_reading)
    db.commit()
    db.refresh(db_reading)
    return db_reading

# Get readings for a meter
@router.get("/meter/{meter_id}", response_model=list[schemas.Reading])
def get_readings(meter_id: int, db: Session = Depends(deps.get_db)):
    return db.query(models.Reading).filter(models.Reading.meter_id == meter_id).order_by(models.Reading.reading_time.desc()).all()
