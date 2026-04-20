'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const baseClass = "hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform";
    if (pathname === path) {
      return `text-[#FF2D78] underline decoration-[3px] underline-offset-4 ${baseClass}`;
    }
    return `text-[#111111] dark:text-zinc-300 ${baseClass}`;
  };

  return (
    <nav className="bg-[#F5F0E8] dark:bg-zinc-900 border-b-[3px] border-[#111111] dark:border-white shadow-[6px_6px_0px_0px_#111111] flex justify-between items-center w-full px-8 py-4 h-24 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="bg-secondary-container border-[3px] border-[#111111] px-4 py-2 shadow-[4px_4px_0px_0px_#111111]">
          <h1 className="text-4xl font-black italic tracking-tighter text-black uppercase font-headline">
            CINEMATCH 🎬
          </h1>
        </div>
        <div className="hidden md:block bg-tertiary-container border-[2px] border-[#111111] px-2 py-1 rotate-[-3deg] -mt-8">
          <span className="font-label text-[10px] font-bold tracking-tight text-on-tertiary-container uppercase">✦ Powered by TF-IDF</span>
        </div>
      </div>
      
      <div className="hidden md:flex gap-8 items-center font-headline font-black tracking-tighter uppercase">
        <Link href="/" className={getLinkClass('/')}>DISCOVER</Link>
        <Link href="/docs" className={getLinkClass('/docs')}>AI LAB</Link>
      </div>
    </nav>
  );
}
