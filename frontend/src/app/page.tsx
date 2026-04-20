"use client";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMessage, setSearchMessage] = useState("🍿 Here's your trending watchlist, bestie —");

  // Rotating styles for the neo-brutalist aesthetic
  const cardStyles = [
    { bg: "bg-[#FFF9C4]", rotate: "rotate-[1.2deg]" },
    { bg: "bg-[#F8BBD0]", rotate: "rotate-[-1.5deg]" },
    { bg: "bg-[#B2DFDB]", rotate: "rotate-[0.8deg]" },
    { bg: "bg-[#E1BEE7]", rotate: "rotate-[-1deg]" },
    { bg: "bg-[#FFE082]", rotate: "rotate-[1.5deg]" },
    { bg: "bg-[#DCEDC8]", rotate: "rotate-[-0.5deg]" }
  ];

  const badgeStyles = [
    "bg-tertiary-container",
    "bg-inverse-primary",
    "bg-[#FFEC40]",
    "bg-white"
  ];

  // Initial load
  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const res = await fetch(`${apiUrl}/api/trending`);
      if (res.ok) {
        const data = await res.json();
        setMovies(data.results || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      fetchTrending();
      setSearchMessage("🍿 Here's your trending watchlist, bestie —");
      return;
    }

    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const res = await fetch(`${apiUrl}/api/recommend?title=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setMovies(data.results || []);
        setSearchMessage(`🎯 Matches for "${data.search_match}" —`);
      } else if (res.status === 404) {
        setMovies([]);
        setSearchMessage(`😭 No matches found for "${searchQuery}" —`);
      }
    } catch (e) {
      console.error(e);
      setSearchMessage(`⚠️ Connection to backend failed —`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-32">
        {/* Hero Section */}
        <section className="mb-24 text-center">
            <div className="relative inline-block mb-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-headline leading-[0.9] text-left max-w-4xl -ml-4">
                                Find Your Next <br/>
            <span className="relative">
                                    Obsession.
                                    <div className="absolute -bottom-2 left-0 w-full h-4 bg-secondary-fixed -z-10"></div>
            </span>
            </h2>
            </div>
            
            {/* Search Console */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto mt-12 bg-surface-container-lowest border-[3px] border-[#111111] shadow-[12px_12px_0px_0px_#111111] p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-grow flex items-center px-4 bg-surface-container-low border-[2px] border-[#111111] focus-within:bg-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-[#111111]" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="search-input"
                  className="w-full bg-transparent border-none focus:ring-0 font-label text-lg py-4 placeholder:text-on-surface-variant outline-none" 
                  placeholder="I want a movie like Interstellar but more emotional..." 
                  type="text"
                />
              </div>
              <button type="submit" className="bg-secondary-container font-headline font-black text-xl px-8 py-4 border-[3px] border-[#111111] whitespace-nowrap hover:bg-[#FFEC40] active:translate-y-1 transition-all">
                                  RECOMMEND ✦
              </button>
            </form>
        </section>

        {/* Watchlist Title */}
        <div className="mb-12">
        <h3 className="text-3xl font-black tracking-tighter uppercase font-headline flex items-center gap-4">
                        {searchMessage}
                        <div className="h-1 flex-grow bg-[#111111]"></div>
        </h3>
        </div>

        {/* Dynamic Masonry Grid */}
        {loading ? (
          <div className="flex justify-center p-20">
            <h3 className="text-5xl font-black tracking-tighter uppercase font-headline animate-pulse">PROCESSING NEURAL VIBES... 🧠</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {movies.map((movie, index) => {
                const style = cardStyles[index % cardStyles.length];
                
                return (
                  <article key={movie.id} className={`${style.bg} border-[3px] border-[#111111] shadow-[6px_6px_0px_0px_#111111] p-6 ${style.rotate} flex flex-col gap-4 transition-transform hover:rotate-0 hover:z-10`}>
                      <div className="aspect-[2/3] border-[3px] border-[#111111] overflow-hidden bg-black flex items-center justify-center">
                        <img className="w-full h-full object-cover" src={movie.poster} alt={movie.title} />
                      </div>
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-start gap-2">
                          <h4 className="font-headline font-black text-2xl leading-tight line-clamp-2 uppercase">{movie.title}</h4>
                          <span className="font-label font-bold text-xs border-[2px] border-[#111111] px-2 py-0.5 bg-white whitespace-nowrap">{movie.year}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {movie.genres.slice(0, 2).map((genre: string, gIdx: number) => (
                              <span key={gIdx} className={`font-label text-[10px] font-bold uppercase ${badgeStyles[gIdx % badgeStyles.length]} px-2 border border-[#111111]`}>
                                {genre}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4">
                              <div className="flex justify-between font-label text-[10px] font-black mb-1">
                              <span>MATCH ENERGY ⚡</span>
                              <span>{movie.match_energy}%</span>
                              </div>
                              <div className="h-4 border-[2px] border-[#111111] bg-surface p-0.5">
                              <div className="h-full bg-primary-container border-r-[2px] border-[#111111]" style={{ width: `${movie.match_energy}%` }}></div>
                              </div>
                          </div>
                      </div>
                  </article>
                );
              })}
          </div>
        )}
      </main>

      {/* Marquee */}
      <div className="fixed bottom-0 left-0 w-full bg-black py-4 border-t-[3px] border-[#111111] overflow-hidden z-[60] hidden md:block">
        <div className="marquee">
            <div className="marquee-content">
            <span className="text-tertiary-fixed font-label font-bold uppercase tracking-widest text-lg whitespace-nowrap">✦ 5000+ movies ✦ TF-IDF powered ✦ No neural nets harmed ✦ Cosine similarity goes brrr ✦</span>
            <span className="text-tertiary-fixed font-label font-bold uppercase tracking-widest text-lg whitespace-nowrap">✦ 5000+ movies ✦ TF-IDF powered ✦ No neural nets harmed ✦ Cosine similarity goes brrr ✦</span>
            </div>
            <div className="marquee-content">
            <span className="text-tertiary-fixed font-label font-bold uppercase tracking-widest text-lg whitespace-nowrap">✦ 5000+ movies ✦ TF-IDF powered ✦ No neural nets harmed ✦ Cosine similarity goes brrr ✦</span>
            <span className="text-tertiary-fixed font-label font-bold uppercase tracking-widest text-lg whitespace-nowrap">✦ 5000+ movies ✦ TF-IDF powered ✦ No neural nets harmed ✦ Cosine similarity goes brrr ✦</span>
            </div>
        </div>
      </div>
    </>
  );
}
