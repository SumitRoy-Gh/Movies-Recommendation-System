# 🎬 CineMatch // AI Movie Discovery

CineMatch is a high-precision movie recommendation system built with a Neo-brutalist aesthetic. It uses **TF-IDF Vectorization** and **Cosine Similarity** to analyze movie "DNA" (metadata) and find your next clinical obsession.

## 🚀 Quick Start

To run the full stack locally, follow these steps:

### 1. Backend (FastAPI + ML)
The backend serves the recommendation engine and integrates with the TMDB API for real-time posters.

```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
# Ensure your .env file has TMDB_ACCESS_TOKEN
uvicorn main:app --reload --port 8000
```

### 2. Frontend (Next.js + Tailwind 4)
The frontend provides a vibrant, neo-brutalist interface for interacting with the AI Lab.

```bash
cd frontend
npm install
npm run dev -- --port 3000
```

## 🏗️ Architecture

- **Data Layer**: Content-based filtering using pre-computed Pickle files (`df.pkl`, `tfidf_matrix.pkl`).
- **Processing**: Python (Pandas, Scikit-learn, NumPy).
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4.
- **API**: FastAPI with CORS-enabled endpoints.

## 🧪 AI Lab
Visit the `/docs` route on the frontend to peek into the "Engine Room" and see how we deconstruct cinema into raw data vectors.

---
*Built with precision over popularity.*
