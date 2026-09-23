from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import seed_database
from app.routes import leads, bds, target, agenda, analytics, auth, alerts

app = FastAPI(
    title="Stratis BD - Lead & Pipeline Intelligence API",
    description="FastAPI Backend for BD Lead Management, Authentication, Call Conversation Alerts, and Analytics",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(bds.router)
app.include_router(target.router)
app.include_router(agenda.router)
app.include_router(analytics.router)
app.include_router(alerts.router)

@app.on_event("startup")
async def startup_event():
    print("🚀 Initializing FastAPI Backend and connecting to MongoDB...")
    await seed_database()

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Stratis BD API",
        "docs": "/docs"
    }
