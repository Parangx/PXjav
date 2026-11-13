import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Watch({ params }: { params: { id: string } }) {
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('video_id', params.id)
    .single();

  if (!video) return notFound();

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      <div className="max-w-5xl mx-auto p-4">
        {/* Tombol Kembali */}
        <Link href="/" className="inline-flex items-center text-sm text-purple-400 hover:text-pink-400 transition-colors mb-4">
          ← Kembali ke Beranda
        </Link>
        
        {/* Judul & Aktris */}
        <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
        <p className="text-gray-400 text-sm mb-4">Aktris: <span className="text-white">{video.actress}</span></p>
        
        {/* Player dengan Border Gradien */}
        <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <iframe
              src={video.embed_url}
              className="w-full h-full"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>

        {/* Info Tambahan */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-gray-400 mb-1">Kategori</p>
            <p className="font-semibold">{video.categories || 'Tidak ada'}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="text-gray-400 mb-1">Tanggal Rilis</p>
            <p className="font-semibold">{video.release_date || 'Tidak diketahui'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
