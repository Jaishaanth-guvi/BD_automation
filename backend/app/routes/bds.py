from fastapi import APIRouter, HTTPException, status
from typing import List
from app.database import db
from app.models import BdModel

router = APIRouter(prefix="/api/bds", tags=["BD Team"])

@router.get("", response_model=List[BdModel])
async def get_all_bds():
    bds = await db.bds.find({}, {"_id": 0}).to_list(100)
    return bds

@router.post("", response_model=BdModel, status_code=status.HTTP_201_CREATED)
async def add_bd(bd: BdModel):
    existing = await db.bds.find_one({"id": bd.id})
    if existing:
        raise HTTPException(status_code=400, detail="BD member already exists")
    await db.bds.insert_one(bd.dict())
    return bd
