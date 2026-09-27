"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"; // Supabase 연결
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorksArchivePage() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. 모든 작품 데이터 불러오기
  useEffect(() => {
    const fetchAllWorks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("works")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) setWorks(data);
      setLoading(false);
    };
    fetchAllWorks();
  }, []);

  return (
    <main className="bg-paper min-h-screen pb-32">
      {/* 상단 네비게이션 (기존 상세페이지 스타일 유지) */}
      <nav className="p-8 flex justify-between items-center sticky top-0 z-50 bg-paper/80 backdrop-blur-sm">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 text-[10px] uppercase tracking-widest hover:opacity-50 transition text-ink"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>
        <div className="text-[10px] uppercase tracking-[0.4em] text-ink/40 font-medium">
          Archive — All Works
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-6 mt-12">
        {/* 헤더 섹션 */}
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif italic text-ink mb-6"
          >
            Archive.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] uppercase tracking-[0.5em] text-ink/40"
          >
            A collection of handwriting artifacts by our members
          </motion.p>
        </header>

        {/* 작품 그리드 (5열 레이아웃) */}
        {loading ? (
          <div className="py-40 text-center font-serif italic opacity-20 animate-pulse text-2xl">
            Gathering pieces...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {works.map((work, idx) => (
              <Link href={`/works/${work.id}`} key={work.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative aspect-square overflow-hidden bg-zinc-100 group cursor-none"
                >
                  {/* 1. 기본 이미지: 흑백, 마우스 올리면 컬러 및 확대 */}
                  <motion.img 
                    src={work.img_url} 
                    alt={work.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1000ms] ease-out" 
                  />
                  
                  {/* 2. 호버 시 상세 정보 레이어 (중앙 정렬) */}
                  <div className="absolute inset-0 bg-ink/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-center p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <h4 className="text-paper text-xl font-serif italic">{work.title}</h4>
                      <div className="w-8 h-px bg-paper/30 mx-auto" />
                      <div>
                        <p className="text-paper/40 text-[9px] uppercase tracking-widest mb-1">Artist</p>
                        <p className="text-paper text-[11px] font-light tracking-wider">{work.artist}</p>
                      </div>
                      <div className="pt-4">
                        <span className="text-paper/20 text-[8px] uppercase tracking-[0.2em] border border-paper/10 px-3 py-1 rounded-full">
                          {work.category}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* 3. 대표작일 경우 표시되는 작은 뱃지 (옵션) */}
                  {work.is_featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* 결과가 없을 때 */}
        {!loading && works.length === 0 && (
          <div className="py-40 text-center border border-dashed border-ink/10">
            <p className="font-serif italic text-ink/30">아직 등록된 작품이 없습니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}