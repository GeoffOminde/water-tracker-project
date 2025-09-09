from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, deps

router = APIRouter()

@router.post("/", response_model=schemas.Property)
def create_property(property: schemas.PropertyCreate, db: Session = Depends(deps.get_db)):
    return crud.create_property(db, property)

@router.get("/owner/{owner_id}", response_model=list[schemas.Property])
def list_properties(owner_id: int, db: Session = Depends(deps.get_db)):
    return crud.get_properties(db, owner_id)
