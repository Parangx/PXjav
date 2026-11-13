import { supabase } from '../../lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function Watch({ params }: { params: { id: string } }) {
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('video_id', params.id)
    .single();

  if (!video) return notFound();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-red-500 hover:underline mb-4 inline-block">⬅️ Kembali</Link>
        
        <h1 className="text-xl font-bold mb-1">{video.title}</h1>
        <p className="text-gray-400 text-sm mb-4">Aktris: {video.actress}</p>
        
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-gray-800">
          <iframe
            src={video.embed_url}
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        <div className="mt-4 text-sm text-gray-400 space-y-1">
          <p><strong className="text-gray-300">Kategori:</strong> {video.categories}</p>
          <p><strong className="text-gray-300">Rilis:</strong> {video.release_date}</p>
        </div>
      </div>
    </div>
  );
}
