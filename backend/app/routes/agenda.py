from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
from pydantic import BaseModel
from app.database import db

router = APIRouter(prefix="/api/agenda", tags=["Agenda"])

class AgendaItemModel(BaseModel):
    id: int
    leadId: Optional[str] = ""
    company: str
    contact: Optional[str] = ""
    type: str = "Call"
    time: str = "10:00 AM"
    title: str
    priority: str = "High"
    done: bool = False

@router.get("", response_model=List[AgendaItemModel])
async def get_all_agenda():
    items = await db.agenda.find({}, {"_id": 0}).to_list(100)
    return items

@router.post("", response_model=AgendaItemModel, status_code=status.HTTP_201_CREATED)
async def create_agenda_item(item: AgendaItemModel):
    await db.agenda.insert_one(item.dict())
    return item

@router.put("/{item_id}/toggle")
async def toggle_agenda_item(item_id: int):
    item = await db.agenda.find_one({"id": item_id})
    if not item:
        raise HTTPException(status_code=404, detail="Agenda task not found")
    
    new_status = not item.get("done", False)
    await db.agenda.update_one(
        {"id": item_id},
        {"$set": {"done": new_status}}
    )
    return {"message": "Status updated", "id": item_id, "done": new_status}
