from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, deps

router = APIRouter()

@router.post("/", response_model=schemas.Meter)
def create_meter(meter: schemas.MeterCreate, db: Session = Depends(deps.get_db)):
    return crud.create_meter(db, meter)

@router.get("/property/{property_id}", response_model=list[schemas.Meter])
def list_meters(property_id: int, db: Session = Depends(deps.get_db)):
    return crud.get_meters(db, property_id)
