import httpx
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.config import settings

async def get_query_embedding(text_prompt: str) -> list[float]:
    """Retrieves text embeddings from Ollama nomic-embed-text model."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            res = await client.post(
                f"{settings.OLLAMA_BASE_URL}/api/embeddings",
                json={"model": "nomic-embed-text", "prompt": text_prompt}
            )
            if res.status_code == 200:
                return res.json().get("embedding", [])
    except Exception:
        pass
    return []

async def retrieve_context_chunks(db: AsyncSession, query: str, top_k: int = 3) -> str:
    """Queries pgvector database for matching rule chunks."""
    embedding = await get_query_embedding(query)
    if not embedding:
        return ""

    embedding_str = f"[{','.join(map(str, embedding))}]"
    sql = text("""
        SELECT content_chunk, source_url 
        FROM service_knowledge_chunks 
        ORDER BY embedding <=> :embedding 
        LIMIT :top_k
    """)
    
    try:
        result = await db.execute(sql, {"embedding": embedding_str, "top_k": top_k})
        rows = result.fetchall()
        chunks = [f"- {row.content_chunk} (Source: {row.source_url})" for row in rows]
        return "\n".join(chunks)
    except Exception:
        return ""