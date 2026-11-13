'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [r18Url, setR18Url] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('⏳ Mengambil metadata...');

    try {
      const res = await fetch('/api/add-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ r18Url, embedUrl }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('🎉 Berhasil! Video sudah ditambahkan.');
        setR18Url('');
        setEmbedUrl('');
      } else {
        setStatus(`❌ Gagal: ${data.error}`);
      }
    } catch (err) {
      setStatus('❌ Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-900 p-6 rounded-lg border border-gray-800">
        <h1 className="text-xl font-bold mb-6 text-red-500">➕ Tambah Video Baru</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL r18.dev (berakhiran /json)</label>
            <input
              type="text"
              value={r18Url}
              onChange={(e) => setR18Url(e.target.value)}
              placeholder="https://r18.dev/videos/vod/movies/detail/-/combined=1sdnm562/json"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">URL Embed upload18.org</label>
            <input
              type="text"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="https://upload18.org/play/index/573a53b7e9c2"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-bold text-sm transition disabled:opacity-50"
          >
            {loading ? 'Memproses...' : '🚀 Simpan ke Database'}
          </button>
        </form>

        {status && (
          <div className="mt-4 p-2 bg-gray-800 rounded text-xs text-center">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
