🤖 AI Research Assistant

AI-Driven Full-Stack Application using Retrieval-Augmented Generation (RAG)

📌 Overview

The AI Research Assistant is an AI-driven full-stack web application that enables users to upload documents and ask natural language questions to receive accurate, context-aware answers with source citations.

The system is built using a Retrieval-Augmented Generation (RAG) architecture, combining semantic search with AI-based answer generation to ensure responses remain grounded in the uploaded documents.

This project was developed during an AI-Driven Full-Stack Development Internship at IGDTUW (June–July 2025).

🧠 Key Concepts Used

Retrieval-Augmented Generation (RAG)

Semantic Search

Vector Databases

Document Chunking & Embeddings

AI-Driven Full-Stack Architecture

✨ Features

📄 Upload multiple documents (PDFs, notes, research papers)

✂️ Automatic document chunking

🧬 Semantic embeddings using Sentence Transformers

📦 Vector storage and retrieval using ChromaDB

🔍 Natural language question answering

📚 Citation-based answers grounded in source documents

🎨 Modern, animated UI with responsive design

⚡ Fast and scalable backend using FastAPI

🏗️ System Architecture (RAG Pipeline)
User Question
     ↓
Query Embedding
     ↓
Vector Similarity Search (ChromaDB)
     ↓
Retrieve Top-K Relevant Chunks
     ↓
Context Augmentation
     ↓
AI-Generated Answer with Citations

🛠️ Tech Stack
Frontend

React

Tailwind CSS

Framer Motion

Zustand (state management)

Lucide Icons

Backend

FastAPI

SentenceTransformers

ChromaDB

Pydantic

Uvicorn

📂 Project Structure
ai-research-assistant/
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, Upload, Ask pages
│   │   ├── components/   # UI components
│   │   ├── store/        # Zustand stores
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── embedingmodel.py  # FastAPI backend
│   └── requirements.txt
│
└── README.md

⚙️ Backend Setup (FastAPI)
1️⃣ Create virtual environment
python -m venv venv

2️⃣ Activate virtual environment

Windows

venv\Scripts\activate


macOS / Linux

source venv/bin/activate

3️⃣ Install dependencies
pip install fastapi uvicorn sentence-transformers chromadb pydantic

4️⃣ Run backend server
uvicorn embedingmodel:app --reload


Backend will be available at:

http://127.0.0.1:8000


Swagger UI:

http://127.0.0.1:8000/docs

⚙️ Frontend Setup (React)
1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev


Frontend runs at:

http://localhost:5173

🔌 API Endpoints
➤ Embed Documents
POST /embed

➤ Query Documents
POST /query

➤ Reset Collection
POST /reset

📊 Example Query Flow

Upload documents

Documents are chunked & embedded

Embeddings stored in ChromaDB

User asks a question

Relevant chunks retrieved via vector similarity

AI generates an answer using retrieved context

Sources are returned with the answer