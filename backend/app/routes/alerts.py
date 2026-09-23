from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from app.database import db

router = APIRouter(prefix="/api/alerts", tags=["BD Call Alerts"])

class CallAlertModel(BaseModel):
    id: str
    leadId: Optional[str] = ""
    company: str
    contactName: str
    bdId: str
    bdName: str
    callType: str = "Follow-up Call"
    date: str
    duration: Optional[str] = "15 mins"
    conversationData: str
    callOutcome: str = "Connected"
    followUpStatus: str = "Scheduled"
    nextFollowUpDate: Optional[str] = ""
    isUrgent: bool = False

@router.get("", response_model=List[CallAlertModel])
async def get_all_call_alerts():
    calls = await db.calls.find({}, {"_id": 0}).to_list(100)
    return calls

@router.post("/log-call", response_model=CallAlertModel, status_code=status.HTTP_201_CREATED)
async def log_bd_call(call: CallAlertModel):
    existing = await db.calls.find_one({"id": call.id})
    if existing:
        raise HTTPException(status_code=400, detail="Call record already exists")
    await db.calls.insert_one(call.dict())
    
    # Optionally update lead's lastContactDate & nextFollowUp
    if call.leadId:
        await db.leads.update_one(
            {"id": call.leadId},
            {"$set": {
                "lastContactDate": call.date.split(" ")[0],
                "nextFollowUp": call.nextFollowUpDate or "-"
            }}
        )
    return call
