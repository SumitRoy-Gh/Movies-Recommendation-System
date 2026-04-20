import React from 'react';

export default function Docs() {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
      {/* Hero Header */}
      <header className="mb-24 relative">
        <div className="absolute -top-12 -left-4 text-primary opacity-20 pointer-events-none select-none">
          <span className="font-label text-9xl">0xDOCS</span>
        </div>
        <h1 className="font-headline font-black text-7xl md:text-9xl text-black/75 tracking-tighter -ml-2 mb-4 leading-none relative z-10">
          Under The Hood <span className="inline-block hover:rotate-12 transition-transform duration-300">🔧</span>
        </h1>
        <p className="font-label text-lg max-w-2xl bg-surface-container-highest inline-block px-4 py-1 border-l-4 border-primary text-[#111111]">
          A TECHNICAL LOOK AT HOW CINEMATCH DECONSTRUCTS CINEMA INTO RAW DATA VECTORS.
        </p>
      </header>

      {/* Call-out Box */}
      <section className="mb-24">
        <div className="bg-secondary-container signature-frame neo-shadow p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 opacity-10">
            <span className="material-symbols-outlined text-[12rem]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>genetics</span>
          </div>
          <h2 className="font-headline font-black text-3xl md:text-5xl text-[#111111] mb-6 tracking-tight relative z-10">
            No user data needed. No cold start problem... Just pure movie DNA — compared mathematically. ✦
          </h2>
          <div className="flex items-center gap-4 relative z-10">
            <span className="font-label text-xs font-bold uppercase tracking-widest bg-[#111111] text-white px-3 py-1">Zero-Trust Privacy</span>
            <div className="h-[2px] flex-grow bg-[#111111]"></div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-label text-primary font-bold">01 // CORE_STACK</span>
            <h3 className="font-headline font-black text-5xl uppercase tracking-tighter text-[#111111] dark:text-white">The Engine Room</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-[#111111]">
          {/* Tech Card 1 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-primary-container">
            <div className="text-6xl mb-6">🐍</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">Python</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">The backbone of our data pipeline, orchestrating complex transformations and model serving.</p>
          </div>
          {/* Tech Card 2 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-tertiary-fixed">
            <div className="text-6xl mb-6">🐼</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">Pandas</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">High-performance data manipulation for structured movie metadata and feature sets.</p>
          </div>
          {/* Tech Card 3 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-inverse-primary">
            <div className="text-6xl mb-6">🤖</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">Scikit-learn</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">Implementing robust machine learning algorithms for text vectorization and proximity search.</p>
          </div>
          {/* Tech Card 4 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-secondary-fixed">
            <div className="text-6xl mb-6">🔢</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">NumPy</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">Foundation for all numerical operations and multi-dimensional matrix calculations.</p>
          </div>
          {/* Tech Card 5 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-[#111111]">
            <div className="text-6xl mb-6">🥒</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">Pickle</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">Binary serialization for our pre-computed movie database (df.pkl) and similarity matrices.</p>
          </div>
          {/* Tech Card 6 */}
          <div className="bg-surface-container-lowest signature-frame neo-shadow p-8 border-b-[8px] border-on-surface-variant">
            <div className="text-6xl mb-6">📓</div>
            <h4 className="font-headline font-black text-2xl mb-2 uppercase">Jupyter</h4>
            <p className="text-on-surface-variant font-medium leading-relaxed">The laboratory where our recommendation algorithms are iteratively tested and refined.</p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="mb-32 text-[#111111]">
        <div className="mb-12">
          <span className="font-label text-primary font-bold">02 // WORKFLOW_LOGIC</span>
          <h3 className="font-headline font-black text-5xl uppercase tracking-tighter dark:text-white">Content Pipeline</h3>
        </div>
        <div className="space-y-4 md:space-y-0 relative">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-0 mb-12">
            <div className="bg-[#111111] text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">1</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">INGESTION</h5>
              <p className="font-bold">Loading <span className="bg-surface-container px-1">df.pkl</span> containing thousands of movie metadata points.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>arrow_forward</span>
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-32 mb-12">
            <div className="bg-[#111111] text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">2</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">VECTORIZATION</h5>
              <p className="font-bold">Applying <span className="bg-surface-container px-1">TF-IDF Vectorization</span> to extract semantic features from tags.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl rotate-90" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>arrow_forward</span>
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-64 mb-12">
            <div className="bg-[#111111] text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">3</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">SIMILARITY</h5>
              <p className="font-bold">Generating the <span className="bg-surface-container px-1">tfidf.pkl</span> matrix for rapid mathematical lookups.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl rotate-0" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>arrow_forward</span>
            </div>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-[24rem] mb-12">
            <div className="bg-[#111111] text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">4</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">MAPPING</h5>
              <p className="font-bold">Executing <span className="bg-surface-container px-1">Cosine Similarity</span> between high-dimensional vectors.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl rotate-90" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>arrow_forward</span>
            </div>
          </div>
          {/* Step 5 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-[12rem] mb-12">
            <div className="bg-[#111111] text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">5</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">FILTERING</h5>
              <p className="font-bold">Sorting indices to find the top 5 closest mathematical neighbors in the film space.</p>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined text-4xl rotate-180" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>arrow_forward</span>
            </div>
          </div>
          {/* Step 6 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:translate-x-0 mb-12">
            <div className="bg-primary text-white w-16 h-16 flex items-center justify-center font-headline font-black text-2xl signature-frame shrink-0">6</div>
            <div className="bg-surface-container-lowest signature-frame p-6 neo-shadow w-full md:w-96">
              <h5 className="font-label font-bold text-xs text-primary mb-2">OUTPUT</h5>
              <p className="font-bold">Rendering the matches via the UI layer for the ultimate <span className="bg-surface-container px-1">CINEMATCH</span> experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Secondary Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-[#111111]">
        <div className="md:col-span-2 bg-surface-container signature-frame p-8 flex flex-col justify-between">
          <div className="mb-12">
            <h3 className="font-headline font-black text-4xl mb-4">Content-Based Filtering</h3>
            <p className="text-lg leading-relaxed opacity-80">Unlike Netflix or Amazon, we don't care what your friends watched. We care about the story arcs, director motifs, and character archetypes defined in the movie's meta-tags. This eliminates the popularity bias inherent in most systems.</p>
          </div>
          <div className="bg-white signature-frame p-4 font-label text-sm">
            QUERY_EXECUTION_TIME: <span className="text-primary font-bold">0.042ms</span>
          </div>
        </div>
        <div className="bg-primary text-white signature-frame p-8 flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-7xl mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>precision_manufacturing</span>
          <p className="font-headline font-black text-2xl">PRECISION OVER POPULARITY</p>
        </div>
      </section>
    </main>
  );
}
