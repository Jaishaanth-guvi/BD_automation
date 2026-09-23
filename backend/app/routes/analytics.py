from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/summary")
async def get_analytics_summary():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    
    total_leads = len(leads)
    total_pipeline = sum(l.get("value", 0) for l in leads if l.get("stage") not in ["Closed Won", "Closed Lost"])
    closed_won_value = sum(l.get("value", 0) for l in leads if l.get("stage") == "Closed Won")
    
    won_count = len([l for l in leads if l.get("stage") == "Closed Won"])
    lost_count = len([l for l in leads if l.get("stage") == "Closed Lost"])
    closed_total = won_count + lost_count
    win_rate = round((won_count / closed_total * 100), 1) if closed_total > 0 else 0
    
    # Source distribution
    source_counts = {}
    for l in leads:
        src = l.get("source", "Other")
        source_counts[src] = source_counts.get(src, 0) + 1

    source_breakdown = [
        {"name": src, "count": count, "percent": round((count / total_leads * 100)) if total_leads > 0 else 0}
        for src, count in source_counts.items()
    ]
    
    return {
        "totalLeads": total_leads,
        "totalPipelineValue": total_pipeline,
        "closedWonValue": closed_won_value,
        "winRate": f"{win_rate}%",
        "sourceBreakdown": source_breakdown
    }
