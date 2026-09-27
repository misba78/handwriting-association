"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase"; // 경로가 맞는지 확인 (app/works/[id] 기준 상위 3단계)
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Share2, Calendar, User, Tag, Clock } from "lucide-react";
import Link from "next/link";

export default function WorkDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkDetail = async () => {
      setLoading(true);
      // Supabase에서 해당 ID의 작품 1개만 가져오기
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setWork(data);
      if (error) console.error("Error fetching work:", error);
      setLoading(false);
    };

    if (id) fetchWorkDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-paper">
        <motion.p 
          animate={{ opacity: [0.2, 0.5, 0.2] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="font-serif italic text-ink/40 text-xl"
        >
          Loading the masterpiece...
        </motion.p>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-paper text-ink">
        <p className="font-serif italic text-2xl mb-8">Work not found.</p>
        <button onClick={() => router.push("/works")} className="text-[10px] uppercase tracking-widest underline opacity-40 hover:opacity-100 transition">
          Back to Archive
        </button>
      </div>
    );
  }

  return (
    <main className="bg-paper min-h-screen pb-32">
      {/* 1. 상단 네비게이션 */}
      <nav className="p-8 flex justify-between items-center sticky top-0 z-50 bg-paper/80 backdrop-blur-sm">
        <button 
          onClick={() => router.back()} 
          className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-ink/60 hover:text-ink transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>
        <div className="flex items-center space-x-6">
           <Share2 size={16} className="text-ink/30 cursor-pointer hover:text-ink transition-colors" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        {/* 2. 메인 이미지 섹션 (감성) */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-zinc-50 border border-ink/5">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={work.img_url}
            className="w-full h-full object-cover"
            alt={work.title}
          />
        </div>

        {/* 3. 정보 레이아웃 (논리) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* 왼쪽: 메타데이터 */}
          <div className="md:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif text-ink mb-6 leading-tight italic">{work.title}</h1>
              <div className="inline-block px-3 py-1 border border-ink/10 rounded-full">
                <p className="text-[9px] text-ink/40 uppercase tracking-[0.2em]">{work.category}</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-6 pt-10 border-t border-ink/5"
            >
              <div className="flex items-center justify-between group">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/30 group-hover:text-ink transition-colors">
                  <User size={12} /> Artist
                </span>
                <span className="text-sm font-medium">{work.artist}</span>
              </div>
              <div className="flex items-center justify-between group">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/30 group-hover:text-ink transition-colors">
                  <Calendar size={12} /> Date
                </span>
                <span className="text-sm font-medium">
                  {new Date(work.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </motion.div>
          </div>

          {/* 오른쪽: 작가의 변/상세 설명 */}
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="md:pl-12 lg:pl-24 border-l border-ink/5"
            >
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-ink/30 mb-10 flex items-center gap-2">
                <Clock size={12} /> Artist's Narrative
              </h3>
              <p className="text-xl md:text-2xl font-serif font-light leading-relaxed text-ink/80 whitespace-pre-wrap">
                {work.description || "이 획에 담긴 작가의 깊은 이야기가 곧 채워질 예정입니다."}
              </p>
              
              {/* 추가 디테일 이미지 (있을 경우를 대비한 자리) */}
              <div className="mt-20 grid grid-cols-2 gap-4 opacity-50">
                <div className="aspect-square bg-zinc-100 overflow-hidden">
                   <img src={work.img_url} className="w-full h-full object-cover grayscale" alt="detail" />
                </div>
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden translate-y-8">
                   <img src={work.img_url} className="w-full h-full object-cover" alt="detail" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}