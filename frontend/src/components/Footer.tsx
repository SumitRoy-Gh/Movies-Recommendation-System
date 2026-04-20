import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-28 md:pb-24 px-8 flex flex-col md:flex-row justify-between items-start gap-8 bg-zinc-100 dark:bg-black border-t-[3px] border-[#111111] dark:border-zinc-800 mb-20 md:mb-0">
      <div className="flex flex-col gap-4">
        <div className="text-lg font-black text-white bg-black px-2 inline-block w-fit">CINEMATCH_CORE</div>
        <p className="font-label text-[10px] tracking-widest uppercase text-zinc-500">BUILD_V1.0.4 // CINEMATCH_CORE</p>
      </div>

      <div className="flex flex-col items-start gap-4 hidden md:flex">
        <p className="font-headline font-bold text-xl">Built by Sumit Roy</p>
        <div className="flex gap-4">
          <a className="w-10 h-10 flex items-center justify-center bg-white signature-frame neo-shadow-sm active-press hover:text-primary" href="https://github.com/SumitRoy-Gh/Movies-Recommendation-System" target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48"}}>code</span>
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        <a className="font-label text-[10px] tracking-widest uppercase text-zinc-500 hover:text-[#FF2D78] underline" href="https://www.instagram.com/r_sumit__/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
        <a className="font-label text-[10px] tracking-widest uppercase text-zinc-500 hover:text-[#FF2D78] underline" href="https://github.com/SumitRoy-Gh" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a className="font-label text-[10px] tracking-widest uppercase text-zinc-500 hover:text-[#FF2D78] underline" href="https://www.linkedin.com/in/sumit-roy-482378314/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
      </div>
    </footer>
  );
}
