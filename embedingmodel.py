from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.utils import embedding_functions

app=FastAPI()

model = SentenceTransformer('thenlper/gte-base')

chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="document_chunks")

class Chunk(BaseModel):
    chunk: str
    docId: str

class ChunkRequest(BaseModel):
    chunks: List[Chunk] 

class QueryRequest(BaseModel):
    query: str
    top_k: int=5

@app.post("/embed")
async def embed_chunk(request: ChunkRequest):
    texts = [c.chunk for c in request.chunks]
    ids = [f"{c.docId}-{i}" for i, c in enumerate(request.chunks)]
    metadatas = [{"docId": c.docId} for c in request.chunks]
    embeddings = model.encode(texts).tolist()

    collection.add(
        documents=texts,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas
    )
    return {"message": "Chunks embedded and stored in ChromaDB", "count": len(embeddings)}
                 

@app.post("/query")
async def query_chunk(request: QueryRequest):
    query_embeddings=model.encode(request.query).tolist()
    results = collection.query(
        query_embeddings=query_embeddings,
        n_results=request.top_k
    )
    return {
    "query": request.query,
    "results": [
        {
            "document": results["documents"][0][i],
            "docId": results["metadatas"][0][i].get("docId"),
            "id": results["ids"][0][i],
            "score": results["distances"][0][i]
        }
        for i in range(len(results["documents"][0]))
    ]
    }

@app.post("/reset")
async def reset_collection():
    collection.delete()
    return {"message": "Collection cleared."}