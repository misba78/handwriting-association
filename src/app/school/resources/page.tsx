"use client";

import Link from "next/link";
import { ChevronLeft, PlayCircle, Instagram, Image as ImageIcon, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      type: "youtube",
      title: "[기초 특강] 이산 선생님의 판본체 기초 1강",
      thumbnail: "https://images.unsplash.com/photo-1544256718-3b61048b8773?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 2,
      type: "instagram",
      title: "수강생 작품 피드백 모음 및 꿀팁",
      thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 3,
      type: "photo",
      title: "2026년 봄학기 야외 스케치 현장 스케치",
      thumbnail: "https://images.unsplash.com/photo-1460518451285-8f2c253d5a44?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 4,
      type: "youtube",
      title: "[심화] 붓펜으로 쓰는 감성 캘리그라피",
      thumbnail: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=800&auto=format&fit=crop",
      link: "#"
    }
  ];

  // 타입별 아이콘 렌더링 함수
  const renderIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <PlayCircle size={20} />;
      case 'instagram': return <Instagram size={20} />;
      default: return <ImageIcon size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Resources</p>
            <h1 className="text-4xl md:text-5xl font-serif italic mb-6">자료실</h1>
            <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-xl">
              학습에 도움이 되는 유튜브 영상, SNS 자료 및 <br className="hidden md:block" />
              현장 사진들을 모아두었습니다.
            </p>
          </div>
          
          {/* 미디어 필터 (디자인용) */}
          <div className="flex gap-4 text-[10px] uppercase tracking-widest border-b border-black/10 pb-2">
            <button className="font-bold border-b-2 border-black pb-1">All</button>
            <button className="opacity-40 hover:opacity-100 transition">Video</button>
            <button className="opacity-40 hover:opacity-100 transition">Photo</button>
          </div>
        </motion.div>

        {/* 미디어 갤러리 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {resources.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group block relative"
            >
              <div className="relative aspect-square bg-black/5 overflow-hidden mb-4">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                {/* 오버레이 효과 및 아이콘 */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 text-black p-4 rounded-full opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                    {renderIcon(item.type)}
                  </div>
                </div>
                
                {/* 타입 뱃지 */}
                <div className="absolute top-3 left-3 bg-white text-black text-[9px] uppercase tracking-widest font-bold px-2 py-1 flex items-center gap-1 shadow-sm">
                  {item.type}
                </div>
              </div>
              
              <h3 className="text-sm font-medium leading-relaxed group-hover:text-black/50 transition-colors flex items-start justify-between gap-2">
                <span className="line-clamp-2">{item.title}</span>
                <ExternalLink size={14} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
              </h3>
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
}