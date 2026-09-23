from fastapi import APIRouter, HTTPException, status
from typing import List
from app.database import db
from app.models import LeadModel, UpdateStageModel, ReassignBdModel, ActivityItem

router = APIRouter(prefix="/api/leads", tags=["Leads"])

@router.get("", response_model=List[LeadModel])
async def get_all_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    return leads

@router.get("/{lead_id}", response_model=LeadModel)
async def get_lead_by_id(lead_id: str):
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead

@router.post("", response_model=LeadModel, status_code=status.HTTP_201_CREATED)
async def create_lead(lead: LeadModel):
    existing = await db.leads.find_one({"id": lead.id})
    if existing:
        raise HTTPException(status_code=400, detail="Lead with this ID already exists")
    await db.leads.insert_one(lead.dict())
    return lead

@router.put("/{lead_id}/stage")
async def update_lead_stage(lead_id: str, stage_data: UpdateStageModel):
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"stage": stage_data.stage}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Stage updated successfully", "stage": stage_data.stage}

@router.put("/{lead_id}/reassign")
async def reassign_lead_bd(lead_id: str, bd_data: ReassignBdModel):
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"assignedBdId": bd_data.assignedBdId}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead reassigned successfully", "assignedBdId": bd_data.assignedBdId}

@router.post("/{lead_id}/activities")
async def add_lead_activity(lead_id: str, activity: ActivityItem):
    lead = await db.leads.find_one({"id": lead_id})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    activities = lead.get("activities", [])
    activities.insert(0, activity.dict())
    
    await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"activities": activities}}
    )
    return {"message": "Activity logged successfully", "activities": activities}

@router.delete("/{lead_id}")
async def delete_lead(lead_id: str):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}
