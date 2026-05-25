"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; // 상대 경로 확인
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoading(true);
      // galleries 테이블에서 'exhibition'(전시 포스터) 카테고리만 가져옵니다.
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .eq("category", "exhibition")
        .order("created_at", { ascending: false });

      if (data) setExhibitions(data);
      setLoading(false);
    };

    fetchExhibitions();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* 네비게이션 상단 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Activities</p>
          <h1 className="text-4xl md:text-5xl font-serif italic">Exhibitions</h1>
        </div>

        {/* 갤러리 그리드 영역 */}
        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading exhibitions...</div>
        ) : exhibitions.length === 0 ? (
          <p className="text-sm italic opacity-40 py-12 border-t border-black/10">등록된 전시 정보가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-black/10 pt-12">
            {exhibitions.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col space-y-4 group cursor-pointer"
              >
                {/* 포스터 이미지 비율 박스 */}
                <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden border border-black/5">
                  <img 
                    src={item.img_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* 텍스트 정보 */}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-black/50 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}