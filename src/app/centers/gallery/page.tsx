"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { ChevronLeft, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function CenterGalleryPage() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      // Admin 페이지에서 'normal'(일반 갤러리)로 등록한 이미지만 가져옵니다.
      const { data } = await supabase
        .from("galleries")
        .select("*")
        .eq("category", "normal")
        .order("created_at", { ascending: false });

      if (data) setGalleries(data);
      setLoading(false);
    };

    fetchGalleries();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">갤러리</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            각 지역 센터와 동아리의 생생한 활동 모습과 추억을 공유합니다. 
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading gallery...</div>
        ) : galleries.length === 0 ? (
          <div className="py-20 border-t border-black/10 flex flex-col items-center justify-center text-black/30 space-y-4">
            <Camera size={48} strokeWidth={1} />
            <p className="text-sm">아직 등록된 사진이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-black/10 pt-12">
            {galleries.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square bg-black/5 overflow-hidden cursor-pointer"
              >
                <img 
                  src={item.img_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* 호버 시 나타나는 정보 레이어 */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-lg font-serif mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/70 text-xs line-clamp-2">{item.description}</p>
                  )}
                  <p className="text-white/40 text-[9px] font-mono mt-4">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}