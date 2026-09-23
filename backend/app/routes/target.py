from fastapi import APIRouter
from app.database import db
from app.models import TargetModel

router = APIRouter(prefix="/api/target", tags=["Target"])

@router.get("", response_model=TargetModel)
async def get_monthly_target():
    target = await db.target.find_one({}, {"_id": 0})
    if not target:
        return {
            "target": 250000,
            "achieved": 185000,
            "month": "September 2026",
            "wonCount": 14,
            "winRate": "38.5%"
        }
    return target
