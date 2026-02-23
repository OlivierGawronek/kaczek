from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Kaczek API", description="API do sprawdzania ogłoszeń na OLX")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdRequest(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Kaczek API działa! Kwak!"}

@app.post("/check-ad")
def check_ad(request: AdRequest):
    print(f"Otrzymano link do sprawdzenia: {request.url}")
    
    return {
        "url": request.url,
        "is_scam": False,
        "risk_level": "low",
        "details": "Wygląda bezpiecznie (to tylko test)."
    }