import os
import httpx
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import pandas as pd
import numpy as np
from dotenv import load_dotenv

# Force load .env from the backend directory specifically to avoid CWD issues
backend_dir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(backend_dir, ".env"))

TMDB_ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")

if not TMDB_ACCESS_TOKEN:
    print("WARNING: TMDB_ACCESS_TOKEN not found in .env — posters will use fallback images.")
else:
    print("TMDB_ACCESS_TOKEN loaded successfully.")


print("Loading ML models... Please wait.")
# Use absolute paths for pickle files based on backend_dir
tfidf_matrix = pickle.load(open(os.path.join(backend_dir, "../tfidf_matrix.pkl"), "rb"))
indices = pickle.load(open(os.path.join(backend_dir, "../indices.pkl"), "rb"))
df = pd.read_pickle(os.path.join(backend_dir, "../df.pkl"))
print(f"Models loaded. Dataset has {len(df)} movies.")


FALLBACK_IMAGES = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCsXJBWaZd4G5Ed64_vkhLWFyAHw6ZTW3PZFWESWmaXcE_Xzr6aXuP9t0eT17RX2wEsM6AbeTHocg4kG5Fm4wVwRo07b6NY41kAQtJEq5pWFDj917sjJp3KdDzOaQ_vAyMmg_ZflSESmu5X9-86Rmmzf7tDHrEnglmA6btZqLhpRAhGXASkYTOi5-FC2zYl3QkRG33W06mjDfZQJFvSwz6Ujyevs_teJw-I-zTI5zu2S5xoGa3HadtLFAVmTp9DrYY3tGo0KGSexg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCk9PHHmG_aZfwfNjUjZGDQ8WW5ITwKOg51wKnDNGSc7No3BY4UrSbxotEUzW9l_SkfuqyNq7ipERZ8xOWx9kRrAgi1yRpKOYZghmRfdDBtZw2chefZgaV9BQFJ0ke2vh6eaOcO_BnwJTvFTG6HXc-DhNt4QXK43Nd140i87Eoz0mOpeCU_eA7AoHVGWCNn7f2nJK7Cd_gaLnSsx51LkIeFRygNCSaitKqlhOzK5XT57Mx15U_LAGmMztE0JEmproM-ATorJojNQg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_nwX0Z7Ke5UCyeFBfK9ZTU7bQ5thAmOvqs9VwOv6gbdnCT52s5MbrKyzzwsKgGoEge8lWuogr6MAyyy1oQDe6i1WAcIbOSwi1iG2mFK92QroxQxWq1NLC7lHfcHQrFRmLNLcmkuknDEFI_GzVIoLuxWKG-3M-Wr9uRu19Pf_uOlazZaG6GXUUWIYMgFZc1t1kC4o-kB8EQTaDlEid1B3NMI4iuwqOopFkpSsLSiWyzGiEP5A3EsgzUU3i3Yixe15yqWEeFNB9SA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBkUPSM_GCi1V-1z5hyM0kelwzdu_MO5TrIAPvL5wPgRdVe9tNsuRSc5WGbjX9QYrllVhkIdXQH048Rp_-ufatyg_eBoHQwZbr89cQc7DWhwQwvL02h-PgFecUo1ZlAFtvIuKhUbeR7iDYDCKFHIBuBN2FpBGsPIUo7Fg3J-wopuJr9qSrXkZRwoNTrABdzAVnGysFQs73k1SLV2gC8HJz5nSToqC0Qrc41RdPAYVrnXvHALlr7x9C-fM9Sk7HKmY1NpjStaBYnAw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAEK1evZkf0wnKb75gF9287BHLP9aKYuEBFKDr9kuSBIyGbA3lUVch87TsI6xkWLQoD_ZgVRjpPV2csRYH4-PqD-MiIzx2VQ2eytk1gLZ0zcsgoL3OpBvafUAh9--xJGOb6_Gwms-6ydpmKKJWgPPqx3cwiPvCgIJ_QB4dZhq2_8YcSfcqawOWriJKgy7uau4jz9yNUZKif7GjuSEw_YgRVD2L9ePJNa24hO3IpfmIdj-dwq5JjIrS7VhVv4KmyV06ytOr16-Wazw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDBN6pr8NsfUj9X4jkAcPiqcKIUFqXn2IuMkjf1wxDGSdSFxl3h_mefg5x8DbwMTwCntDY-wC4TXRN-1u_qN3kaHcTK_YPAouzIqeMGjINGgpkL8INlkdiJqE1d9YRHNKlf5vnbmUHH3ef0S3R8AquTPgpeLpBMDbtq5S4YCE01Nbvsb41ZUXOw8rArAG7GMj1Yhi0gB8V5EmxNLAspTabRMaDA-MNDPuN8yukjGLGFx7rIA93HESYXYFCVktbeZUsMR-4cH4IdVQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuABuFj1NAcysO9cswYho8spDyj9-RHRfPuYnjCTOb9HFQ_QDYcmZMsgxthH8P2A5Gy1eWCMXbxu3uX6pPAOW-5COzJe1I57GPOEUuP0P3H9DgyXEZo9eWN-eDT_IPQIF446cDXlnPHAv53aQGbRMkni-dUfWcGBojbyveglQ-_dnLoeYGOZ6y5DN2Ij0iogE0CGRF2rG7RR1f1hfvAIWBhja9o7xb4oLLJrSqsJffU7v0blESG8aY8HYU2nSvI_aBDnCHquVlQnYg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBKjKS_-yJP9H8nfh7FrwJXRvnQhu7ijGnFGNlGfudc2_lBo_LZbcjqibx41ALp92cdT4sI0hXELAQeZRGACMLWKqeyVo9n9RAPalq-fhNpjFQQiaVDE7V5q55ULVLOK_yanM_N8bNVj5j1PKRUwuSantIYk16IYu5Hx4yXzj7M5HjkiLfNJ7PJ0u8MU-zGDbq3jjJW-l3LxZJyS1yMLx7AVPGwz42XylnXVhZNqThMD_QlcH7HX79P1naWT90QPpssKHKNahNqFQ"
]


app = FastAPI()

# Enable CORS
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL] if FRONTEND_URL != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared client initialized lazily with retries
_tmdb_client = None

async def get_tmdb_client():
    global _tmdb_client
    if _tmdb_client is None or _tmdb_client.is_closed:
        # Define a transport with retries for robustness
        transport = httpx.AsyncHTTPTransport(retries=2)
        _tmdb_client = httpx.AsyncClient(timeout=20.0, transport=transport)
    return _tmdb_client

# Concurrency semaphore to prevent overwhelming slow connections (limit to 3 concurrent fetches)
tmdb_semaphore = asyncio.Semaphore(3)

async def fetch_tmdb_poster(title: str) -> tuple[str | None, str]:
    """
    Fetches poster URL and release year from TMDB for a given movie title.
    Returns (poster_url, year) — poster_url is None if not found or token missing.
    """
    fallback_year = "N/A"

    if not TMDB_ACCESS_TOKEN:
        return None, fallback_year

    async with tmdb_semaphore:
        try:
            url = "https://api.themoviedb.org/3/search/movie"
            headers = {
                "accept": "application/json",
                "Authorization": f"Bearer {TMDB_ACCESS_TOKEN}"
            }
            params = {
                "query": title,
                "include_adult": "false",
                "language": "en-US",
                "page": 1
            }

            client = await get_tmdb_client()
            response = await client.get(url, headers=headers, params=params)

            if response.status_code == 401:
                print("TMDB: Unauthorized — check your TMDB_ACCESS_TOKEN in .env")
                return None, fallback_year

            if response.status_code != 200:
                print(f"TMDB returned {response.status_code} for '{title}'")
                return None, fallback_year

            data = response.json()
            results = data.get("results", [])

            if not results:
                print(f"TMDB: No results found for '{title}'")
                return None, fallback_year

            first = results[0]
            poster_path = first.get("poster_path")
            release_date = first.get("release_date", "")

            poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
            year = release_date.split("-")[0] if release_date else fallback_year

            return poster_url, year

        except httpx.TimeoutException:
            print(f"TMDB timeout for '{title}'")
        except Exception as e:
            print(f"TMDB error for '{title}': {e}")

    return None, fallback_year


async def build_movie_result(i: int, row, score: int) -> dict:
    """Builds a single movie result dict with poster, year, genres, match energy."""
    title = row["title"]
    poster_url, year = await fetch_tmdb_poster(title)

    # Use TMDB poster if found, otherwise rotate through fallback images
    poster = poster_url if poster_url else FALLBACK_IMAGES[i % len(FALLBACK_IMAGES)]

    genres = row["genres"].split()[:2] if isinstance(row["genres"], str) else []

    return {
        "id": int(i),
        "title": title,
        "genres": genres,
        "match_energy": score,
        "poster": poster,
        "year": year,
        "has_real_poster": poster_url is not None  # useful for frontend debugging
    }


@app.get("/")
def read_root():
    """Health check endpoint."""
    return {"status": "online", "message": "CineMatch AI Backend is running."}


@app.get("/api/trending")
async def get_trending():
    """Returns 8 trending movies by popularity score > 30, with parallel fetching."""
    trending = df[df['popularity'].astype(float) > 30].head(8)
    
    tasks = []
    for i, row in trending.iterrows():
        tasks.append(build_movie_result(i, row, score=99))
    
    results = await asyncio.gather(*tasks)
    return {"results": results}


@app.get("/api/recommend")
async def recommend_movies(title: str, n: int = 8):
    """Returns top-n similar movies with parallel poster fetching."""

    # Fuzzy match if exact title not found
    if title not in indices:
        matches = df[df['title'].str.contains(title, case=False, na=False, regex=False)].copy()
        if matches.empty:
            raise HTTPException(status_code=404, detail=f"Movie '{title}' not found in dataset.")
        
        # Sort by popularity to pick the most likely candidate (e.g. Marvel vs 1998 Avengers)
        matches.loc[:, 'popularity'] = pd.to_numeric(matches['popularity'], errors='coerce')
        matches = matches.sort_values(by='popularity', ascending=False)
        idx = matches.index[0]
        title = matches.iloc[0]['title']
    else:
        idx = indices[title]
        # Handle duplicate titles in the index map
        if hasattr(idx, '__iter__'):
            candidate_indices = idx.tolist() if hasattr(idx, 'tolist') else list(idx)
            # Find the index of the most popular version
            idx = df.loc[candidate_indices]['popularity'].apply(pd.to_numeric, errors='coerce').idxmax()

    similarity_scores = cosine_similarity(tfidf_matrix[idx], tfidf_matrix)
    movie_indices = similarity_scores.argsort()[0][::-1][1:n + 1]
    top_scores = np.sort(similarity_scores[0])[::-1][1:n + 1]

    recommended = df.iloc[movie_indices]
    
    tasks = []
    for raw_score, (i, row) in zip(top_scores, recommended.iterrows()):
        # Normalize match energy to a human-friendly 40–99 range
        energy = min(int(raw_score * 100) + 15, 99)
        if energy < 40:
            energy += 30
        tasks.append(build_movie_result(i, row, score=energy))

    results = await asyncio.gather(*tasks)
    return {"results": results, "search_match": title}