import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 60;

export default async function Home() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gradient-main text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-xl">🎬</span>
            </div>
            <h1 className="text-2xl font-black text-gradient tracking-tight">ParangX</h1>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" placeholder="Cari video, aktris, atau kode..." className="bg-transparent border-none outline-none text-sm ml-3 w-full text-white placeholder-gray-500" />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-pink-500/50">
              P
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-gradient">Koleksi Premium</h2>
          <p className="text-gray-400 text-lg mb-8">Dikurasi dengan penuh cinta oleh ParangX. Temukan video terbaik di sini.</p>
          
          {/* Filter Kategori (Statis untuk sekarang) */}
          <div className="flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/50">Semua</button>
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition text-sm">Married Woman</button>
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition text-sm">Adultery</button>
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition text-sm">Slender</button>
            <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition text-sm">Squirting</button>
          </div>
        </div>
      </header>

      {/* Grid Video */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {videos?.map((video, index) => (
            <Link href={`/watch/${video.video_id}`} key={video.id}>
              <div className="video-card animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="gradient-border">
                  <div className="overflow-hidden rounded-xl">
                    <div className="relative">
                      <img src={video.thumbnail} alt={video.title} className="w-full aspect-[3/4] object-cover" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent"></div>
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-bold shadow-lg">HD</div>
                    </div>
                    <div className="p-3 bg-[#0d0d14]">
                      <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-wider">{video.video_id}</span>
                      <h3 className="font-bold text-sm line-clamp-2 mt-1 text-white">{video.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{video.actress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </main>
  );
}
