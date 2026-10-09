from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, services, utilities

app = FastAPI(
    title="Nagarik Sathi AI Backend",
    description="Open-source self-hosted civic agent engine for Nepal",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])
app.include_router(services.router, prefix="/api/v1/services", tags=["Services"])
app.include_router(utilities.router, prefix="/api/v1/utilities", tags=["Utilities"])

@app.get("/health")
def health():
    return {"status": "ok", "engine": "FastAPI", "provider": "Ollama Local Inference"}