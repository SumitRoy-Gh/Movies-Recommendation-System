import Link from 'next/link';

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full border-t-[3px] border-[#111111] dark:border-white z-50 bg-[#F5F0E8] dark:bg-zinc-900 flex justify-around items-center h-20 px-4 pb-safe">
      <Link href="/" className="flex flex-col items-center gap-1 text-[#111111] dark:text-zinc-400 opacity-70 hover:opacity-100 active:scale-95 transition-transform">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>grid_view</span>
        <span className="font-label text-[10px] font-bold uppercase">FEED</span>
      </Link>
      
      <Link href="/#search-input" className="flex flex-col items-center gap-1 text-[#111111] dark:text-zinc-400 opacity-70 hover:opacity-100 active:scale-95 transition-transform">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>search</span>
        <span className="font-label text-10px font-bold uppercase">SEARCH</span>
      </Link>

      <Link href="/" className="flex flex-col items-center gap-1 bg-[#FFEC40] text-[#111111] border-2 border-[#111111] px-4 py-1 active:scale-95 transition-transform">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>database</span>
        <span className="font-label text-10px font-bold uppercase">VAULT</span>
      </Link>

      <Link href="/docs" className="flex flex-col items-center gap-1 text-[#111111] dark:text-zinc-400 opacity-70 hover:opacity-100 active:scale-95 transition-transform">
        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>terminal</span>
        <span className="font-label text-[10px] font-bold uppercase">USER</span>
      </Link>
    </nav>
  );
}
