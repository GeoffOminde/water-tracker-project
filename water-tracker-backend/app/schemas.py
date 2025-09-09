from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    phone: str

class UserCreate(UserBase):
    role: str = "household"

class User(UserBase):
    id: int
    role: str

    class Config:
        orm_mode = True

class PropertyBase(BaseModel):
    address: str

class PropertyCreate(PropertyBase):
    owner_id: int

class Property(PropertyBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class MeterBase(BaseModel):
    meter_number: str

class MeterCreate(MeterBase):
    property_id: int

class Meter(MeterBase):
    id: int
    property_id: int

    class Config:
        orm_mode = True
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class ReadingBase(BaseModel):
    meter_id: int
    reading_value: float
    source: str = "manual"
    confidence: Optional[float] = 1.0
    reading_photo_url: Optional[str] = None
    reading_time: Optional[datetime] = None

class ReadingCreate(ReadingBase):
    pass

class Reading(ReadingBase):
    id: int

    class Config:
        orm_mode = True
from datetime import datetime

class AlertBase(BaseModel):
    meter_id: int
    type: str
    status: str

class Alert(AlertBase):
    id: int
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        orm_mode = True
