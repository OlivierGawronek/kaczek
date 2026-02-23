from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Kaczek API", description="API do sprawdzania ogłoszeń na OLX")

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