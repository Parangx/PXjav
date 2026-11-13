import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(req: Request) {
  try {
    const { r18Url, embedUrl } = await req.json();

    const match = r18Url.match(/combined=([^/]+)\/json/);
    if (!match) {
      return NextResponse.json({ error: 'Format URL r18.dev tidak valid.' }, { status: 400 });
    }
    const videoId = match[1];

    const r18Res = await fetch(`https://r18.dev/videos/vod/movies/detail/-/combined=${videoId}/json`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!r18Res.ok) {
      return NextResponse.json({ error: 'Gagal mengambil metadata dari r18.dev.' }, { status: 502 });
    }

    const metadata = await r18Res.json();

    const title = metadata.title_en || metadata.title_ja || 'Tanpa Judul';
    const actress = metadata.actresses?.map((a: any) => a.name_romaji || a.name_kanji).join(', ') || 'Tidak diketahui';
    const categories = metadata.categories?.map((c: any) => c.name_en).join(', ') || '';
    const releaseDate = metadata.release_date || null;
    const gallery = JSON.stringify(metadata.gallery?.slice(0, 5).map((g: any) => g.image_thumb) || []);

    let thumbnail = metadata.jacket_full_url || '';
    if (thumbnail) {
      thumbnail = thumbnail.replace('pics.dmm.co.jp', 'awsimgsrc.dmm.com')
                           .replace('/mono/movie/adult/', '/dig/mono/movie/');
    }

    const { error } = await supabase.from('videos').upsert({
      video_id: videoId,
      title: title,
      actress: actress,
      thumbnail: thumbnail,
      gallery: gallery,
      embed_url: embedUrl,
      categories: categories,
      release_date: releaseDate,
    }, { onConflict: 'video_id' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, video_id: videoId });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
      }
