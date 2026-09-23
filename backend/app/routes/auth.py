from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(credentials: LoginRequest):
    user_lower = credentials.username.strip().lower()
    # Accept both 'admin' and 'admoin' for smooth experience
    if user_lower in ["admin", "admoin"] and credentials.password == "admin":
        return {
            "success": True,
            "token": "bd_admin_token_2026",
            "user": {
                "username": "admin",
                "name": "Alex Rivers",
                "role": "Senior BD Manager",
                "email": "alex.r@company.com"
            }
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password. Please use username: admin and password: admin"
    )
