from sqlalchemy.orm import Session
from . import models, schemas

# Users
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_phone(db: Session, phone: str):
    return db.query(models.User).filter(models.User.phone == phone).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, phone=user.phone, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Properties
def get_properties(db: Session, owner_id: int):
    return db.query(models.Property).filter(models.Property.owner_id == owner_id).all()

def create_property(db: Session, property: schemas.PropertyCreate):
    db_property = models.Property(address=property.address, owner_id=property.owner_id)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property

# Meters
def get_meters(db: Session, property_id: int):
    return db.query(models.Meter).filter(models.Meter.property_id == property_id).all()

def create_meter(db: Session, meter: schemas.MeterCreate):
    db_meter = models.Meter(meter_number=meter.meter_number, property_id=meter.property_id)
    db.add(db_meter)
    db.commit()
    db.refresh(db_meter)
    return db_meter
