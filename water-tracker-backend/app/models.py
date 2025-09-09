from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True)
    role = Column(String, default="household")

    properties = relationship("Property", back_populates="user_owner")

class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    address = Column(String)

    user_owner = relationship("User", back_populates="properties")
    meters = relationship("Meter", back_populates="property")

class Meter(Base):
    __tablename__ = "meters"
    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, ForeignKey("properties.id"))
    meter_number = Column(String, unique=True)

    property = relationship("Property", back_populates="meters")
from sqlalchemy import Float, DateTime

class Reading(Base):
    __tablename__ = "readings"
    id = Column(Integer, primary_key=True, index=True)
    meter_id = Column(Integer, ForeignKey("meters.id"))
    reading_value = Column(Float)
    reading_time = Column(DateTime)
    source = Column(String)
    confidence = Column(Float)
    reading_photo_url = Column(String, nullable=True)

    meter = relationship("Meter", back_populates="readings")

Meter.readings = relationship("Reading", back_populates="meter")
from sqlalchemy import DateTime

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    meter_id = Column(Integer, ForeignKey("meters.id"))
    type = Column(String)
    status = Column(String)
    created_at = Column(DateTime)
    resolved_at = Column(DateTime, nullable=True)

    meter = relationship("Meter", back_populates="alerts")

Meter.alerts = relationship("Alert", back_populates="meter")
