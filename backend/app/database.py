import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "bd_dashboard_db")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

INITIAL_BDS = [
  { "id": "bd-1", "name": "Alex Rivers", "role": "Senior BD Manager", "email": "alex.r@company.com", "avatar": "AR", "color": "#059669", "target": 80000 },
  { "id": "bd-2", "name": "Priya Sharma", "role": "Enterprise BD Lead", "email": "priya.s@company.com", "avatar": "PS", "color": "#0d9488", "target": 75000 },
  { "id": "bd-3", "name": "Michael Scott", "role": "Regional BD Executive", "email": "michael.s@company.com", "avatar": "MS", "color": "#16a34a", "target": 60000 },
  { "id": "bd-4", "name": "Sarah Connor", "role": "Tech BD Specialist", "email": "sarah.c@company.com", "avatar": "SC", "color": "#0284c7", "target": 65000 }
]

INITIAL_LEADS = [
  {
    "id": "LD-1001",
    "company": "Acme Enterprises",
    "contactName": "Sarah Jenkins",
    "email": "s.jenkins@acmeent.com",
    "phone": "+1 (555) 234-5678",
    "title": "VP of Procurement",
    "value": 45000,
    "stage": "Proposal Sent",
    "priority": "High",
    "source": "LinkedIn",
    "leadScore": 88,
    "assignedBdId": "bd-1",
    "createdAt": "2026-09-10",
    "lastContactDate": "2026-09-21",
    "nextFollowUp": "2026-09-24",
    "notes": "Interested in the enterprise annual tier. Demo went exceptionally well.",
    "activities": [
      { "id": 1, "type": "Meeting", "title": "Product Demo & Q&A", "date": "2026-09-21", "note": "Demonstrated custom reporting API." },
      { "id": 2, "type": "Email", "title": "Sent Formal Proposal v1", "date": "2026-09-18", "note": "Sent $45k customized pricing proposal." }
    ]
  },
  {
    "id": "LD-1002",
    "company": "Apex Global Solutions",
    "contactName": "Michael Chang",
    "email": "m.chang@apexglobal.io",
    "phone": "+1 (555) 876-5432",
    "title": "Head of Growth",
    "value": 78000,
    "stage": "Negotiation",
    "priority": "High",
    "source": "Website Lead",
    "leadScore": 94,
    "assignedBdId": "bd-2",
    "createdAt": "2026-09-02",
    "lastContactDate": "2026-09-22",
    "nextFollowUp": "2026-09-23",
    "notes": "Reviewing legal SLA compliance terms. High probability of closing this week.",
    "activities": [
      { "id": 1, "type": "Call", "title": "Contract Negotiation Call", "date": "2026-09-22", "note": "Agreed on 2-year commitment." }
    ]
  },
  {
    "id": "LD-1003",
    "company": "BioHealth Tech",
    "contactName": "Dr. Elena Rostova",
    "email": "elena@biohealthtech.org",
    "phone": "+1 (555) 345-6789",
    "title": "Chief Digital Officer",
    "value": 28000,
    "stage": "Contacted",
    "priority": "Medium",
    "source": "Industry Event",
    "leadScore": 65,
    "assignedBdId": "bd-3",
    "createdAt": "2026-09-15",
    "lastContactDate": "2026-09-19",
    "nextFollowUp": "2026-09-25",
    "notes": "Met at TechMed Expo. Needs security compliance confirmation.",
    "activities": [
      { "id": 1, "type": "Email", "title": "Intro & Security Whitepaper Sent", "date": "2026-09-19", "note": "Shared HIPAA compliance documentation." }
    ]
  },
  {
    "id": "LD-1004",
    "company": "CloudScale Systems",
    "contactName": "David Miller",
    "email": "dmiller@cloudscale.net",
    "phone": "+1 (555) 901-2345",
    "title": "Director of IT Operations",
    "value": 120000,
    "stage": "Closed Won",
    "priority": "High",
    "source": "Referral",
    "leadScore": 98,
    "assignedBdId": "bd-1",
    "createdAt": "2026-08-20",
    "lastContactDate": "2026-09-20",
    "nextFollowUp": "-",
    "notes": "3-Year agreement signed! Onboarding scheduled for Oct 1st.",
    "activities": [
      { "id": 1, "type": "Meeting", "title": "Contract Signed & Handover", "date": "2026-09-20", "note": "Signed contract received." }
    ]
  },
  {
    "id": "LD-1005",
    "company": "Delta Logistics Corp",
    "contactName": "Rachel Adams",
    "email": "rachel.a@deltalogistics.com",
    "phone": "+1 (555) 456-7890",
    "title": "VP Operations",
    "value": 32000,
    "stage": "New Lead",
    "priority": "Medium",
    "source": "Cold Email Outreach",
    "leadScore": 50,
    "assignedBdId": "bd-4",
    "createdAt": "2026-09-22",
    "lastContactDate": "2026-09-22",
    "nextFollowUp": "2026-09-23",
    "notes": "Responded to outbound sequence campaign requesting product deck.",
    "activities": [
      { "id": 1, "type": "Email", "title": "Outbound Lead Response", "date": "2026-09-22", "note": "Sent initial presentation." }
    ]
  },
  {
    "id": "LD-1006",
    "company": "EcoEnergy Tech",
    "contactName": "Marcus Vance",
    "email": "m.vance@ecoenergy.co",
    "phone": "+1 (555) 678-9012",
    "title": "Sustainability Officer",
    "value": 55000,
    "stage": "Proposal Sent",
    "priority": "High",
    "source": "LinkedIn",
    "leadScore": 78,
    "assignedBdId": "bd-2",
    "createdAt": "2026-09-08",
    "lastContactDate": "2026-09-20",
    "nextFollowUp": "2026-09-24",
    "notes": "Proposal under review by board of directors.",
    "activities": [
      { "id": 1, "type": "Email", "title": "Proposal Revisions Sent", "date": "2026-09-20", "note": "Updated SLA response times." }
    ]
  }
]

INITIAL_CALL_ALERTS = [
  {
    "id": "CALL-501",
    "leadId": "LD-1002",
    "company": "Apex Global Solutions",
    "contactName": "Michael Chang",
    "bdId": "bd-2",
    "bdName": "Priya Sharma",
    "callType": "Contract Negotiation Call",
    "date": "2026-09-22 14:30",
    "duration": "24 mins",
    "conversationData": "Client agreed on 2-year enterprise commitment with 10% volume discount. Michael requested updated legal SLA clause #4 regarding uptime guarantees.",
    "callOutcome": "Proposal Accepted / Pending Legal",
    "followUpStatus": "Action Required Today",
    "nextFollowUpDate": "2026-09-23",
    "isUrgent": True
  },
  {
    "id": "CALL-502",
    "leadId": "LD-1001",
    "company": "Acme Enterprises",
    "contactName": "Sarah Jenkins",
    "bdId": "bd-1",
    "bdName": "Alex Rivers",
    "callType": "Product Architecture Review",
    "date": "2026-09-21 11:00",
    "duration": "35 mins",
    "conversationData": "Reviewed custom reporting API endpoints and multi-user RBAC controls. Sarah requested customized ROI calculation spreadsheet for 500 seat license rollout.",
    "callOutcome": "Scheduled ROI Review",
    "followUpStatus": "Follow-up Tomorrow",
    "nextFollowUpDate": "2026-09-24",
    "isUrgent": False
  },
  {
    "id": "CALL-503",
    "leadId": "LD-1008",
    "company": "GigaByte Media",
    "contactName": "Chloe Sterling",
    "bdId": "bd-4",
    "bdName": "Sarah Connor",
    "callType": "Initial Discovery Call",
    "date": "2026-09-21 16:15",
    "duration": "18 mins",
    "conversationData": "Discussed current pain points with attribution models. Chloe wants to see live demo of campaign ROI analytics dashboard.",
    "callOutcome": "Demo Meeting Scheduled",
    "followUpStatus": "Scheduled for Sep 24",
    "nextFollowUpDate": "2026-09-24",
    "isUrgent": False
  },
  {
    "id": "CALL-504",
    "leadId": "LD-1003",
    "company": "BioHealth Tech",
    "contactName": "Dr. Elena Rostova",
    "bdId": "bd-3",
    "bdName": "Michael Scott",
    "callType": "Compliance & Security Call",
    "date": "2026-09-19 15:00",
    "duration": "15 mins",
    "conversationData": "Sent HIPAA compliance whitepaper. Dr. Elena requested SOC2 Type II audit report before moving to formal demo stage.",
    "callOutcome": "Documentation Sent",
    "followUpStatus": "Overdue Follow-up Alert",
    "nextFollowUpDate": "2026-09-22",
    "isUrgent": True
  }
]

MONTHLY_TARGET_DATA = {
  "target": 250000,
  "achieved": 185000,
  "month": "September 2026",
  "wonCount": 14,
  "winRate": "38.5%"
}

BD_ACTIVITIES_TODAY = [
  { "id": 101, "leadId": "LD-1002", "company": "Apex Global Solutions", "contact": "Michael Chang", "type": "Call", "time": "10:30 AM", "title": "Follow-up on legal clause #4", "priority": "High", "done": False },
  { "id": 102, "leadId": "LD-1001", "company": "Acme Enterprises", "contact": "Sarah Jenkins", "type": "Email", "time": "02:00 PM", "title": "Send customized ROI calculator sheet", "priority": "High", "done": False },
  { "id": 103, "leadId": "LD-1008", "company": "GigaByte Media", "contact": "Chloe Sterling", "type": "Meeting", "time": "04:15 PM", "title": "Discovery Call & Tech Architecture Review", "priority": "Medium", "done": False },
  { "id": 104, "leadId": "LD-1003", "company": "BioHealth Tech", "contact": "Dr. Elena Rostova", "type": "Email", "time": "05:00 PM", "title": "Check compliance doc status", "priority": "Low", "done": True }
]

async def seed_database():
  """Seed MongoDB with mock data if collections are empty"""
  bds_count = await db.bds.count_documents({})
  if bds_count == 0:
    await db.bds.insert_many(INITIAL_BDS)
    print("✓ Seeded BD team collection in MongoDB")

  leads_count = await db.leads.count_documents({})
  if leads_count == 0:
    await db.leads.insert_many(INITIAL_LEADS)
    print("✓ Seeded Leads collection in MongoDB")

  calls_count = await db.calls.count_documents({})
  if calls_count == 0:
    await db.calls.insert_many(INITIAL_CALL_ALERTS)
    print("✓ Seeded Call Alerts collection in MongoDB")

  target_count = await db.target.count_documents({})
  if target_count == 0:
    await db.target.insert_one(MONTHLY_TARGET_DATA)
    print("✓ Seeded Monthly Target collection in MongoDB")

  agenda_count = await db.agenda.count_documents({})
  if agenda_count == 0:
    await db.agenda.insert_many(BD_ACTIVITIES_TODAY)
    print("✓ Seeded Agenda collection in MongoDB")
