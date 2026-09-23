from pydantic import BaseModel, Field
from typing import List, Optional

class ActivityItem(BaseModel):
    id: Optional[int] = None
    type: str
    title: str
    date: str
    note: Optional[str] = ""

class LeadModel(BaseModel):
    id: str
    company: str
    contactName: str
    email: str
    phone: Optional[str] = ""
    title: Optional[str] = ""
    value: float
    stage: str
    priority: str
    source: str
    leadScore: int = 75
    assignedBdId: Optional[str] = "bd-1"
    createdAt: Optional[str] = ""
    lastContactDate: Optional[str] = ""
    nextFollowUp: Optional[str] = ""
    notes: Optional[str] = ""
    activities: List[ActivityItem] = []

class UpdateStageModel(BaseModel):
    stage: str

class ReassignBdModel(BaseModel):
    assignedBdId: str

class BdModel(BaseModel):
    id: str
    name: str
    role: str
    email: str
    avatar: str
    color: str = "#059669"
    target: float = 50000.0

class TargetModel(BaseModel):
    target: float
    achieved: float
    month: str
    wonCount: int
    winRate: str
