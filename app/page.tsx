import { supabase } from '../lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
          🎬 ParangX Streaming
        </h1>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {videos?.map((video) => (
          <Link href={`/watch/${video.video_id}`} key={video.id}>
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer border border-gray-800">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="p-2">
                <span className="text-[10px] font-bold text-red-500 uppercase">{video.video_id}</span>
                <h3 className="font-semibold text-xs line-clamp-2 mt-1">{video.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{video.actress}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
