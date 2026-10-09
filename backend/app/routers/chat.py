from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
import httpx
import json
from app.config import settings
from app.database import get_db
from app.schemas.schemas import ChatPayload
from app.services.rag_engine import retrieve_context_chunks

router = APIRouter()

SYSTEM_PROMPT = """You are Nagarik Sathi AI (नागरिक साथी), an open-source civic virtual assistant for Nepal government services.
- Communicate fluently in English, Nepali (नेपाली), or Romanized Nepali (e.g., "Driving license apply garnalai k chaincha?").
- Provide accurate instructions for Passports (nepalpassport.gov.np), National ID (DoNIDCR), and Driving Licenses (DoTM - dotm.gov.np).
- Mention official fees, required documents, and government portals (.gov.np) clearly."""

@router.post("/stream")
async def chat_stream(payload: ChatPayload, db: AsyncSession = Depends(get_db)):
    user_query = payload.messages[-1].text if payload.messages else ""

    try:
        context_str = await retrieve_context_chunks(db, user_query)
    except Exception:
        context_str = ""

    formatted_messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    if context_str:
        formatted_messages.append({
            "role": "system",
            "content": f"Verified official knowledge context:\n{context_str}"
        })

    for msg in payload.messages:
        formatted_messages.append({
            "role": "user" if msg.sender == "user" else "assistant",
            "content": msg.text
        })

    async def ollama_stream_generator():
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                async with client.stream(
                    "POST",
                    f"{settings.OLLAMA_BASE_URL}/api/chat",
                    json={
                        "model": settings.OLLAMA_MODEL,
                        "messages": formatted_messages,
                        "stream": True,
                    },
                ) as response:
                    if response.status_code != 200:
                        yield "Ollama Error: Ensure local Ollama instance is running."
                        return

                    async for line in response.aiter_lines():
                        if not line:
                            continue
                        try:
                            data = json.loads(line)
                        except json.JSONDecodeError:
                            continue
                        chunk = data.get("message", {}).get("content", "")
                        if chunk:
                            yield chunk
        except httpx.HTTPError as exc:
            yield f"Ollama connection error: {exc}. Please start Ollama at {settings.OLLAMA_BASE_URL}."

    return StreamingResponse(ollama_stream_generator(), media_type="text/plain")