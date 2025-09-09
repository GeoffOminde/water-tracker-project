from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from .. import models, deps, schemas

router = APIRouter()

# Simple anomaly detection v1: 2 consecutive readings above baseline
@router.get("/check/{meter_id}", response_model=list[schemas.Alert])
def check_alerts(meter_id: int, db: Session = Depends(deps.get_db)):
    readings = db.query(models.Reading).filter(models.Reading.meter_id == meter_id).order_by(models.Reading.reading_time.desc()).limit(14).all()
    if len(readings) < 2:
        return []

    # Simple median + MAD check
    values = [r.reading_value for r in readings]
    median = sorted(values)[len(values)//2]
    mad = sum(abs(v - median) for v in values)/len(values)
    alerts = []
    for r in readings[:2]:  # check last 2 readings
        if r.reading_value > median + 3*mad:
            alert = models.Alert(
                meter_id=meter_id,
                type="Possible leak",
                status="active",
                created_at=datetime.utcnow()
            )
            db.add(alert)
            db.commit()
            db.refresh(alert)
            alerts.append(alert)
    return alerts
