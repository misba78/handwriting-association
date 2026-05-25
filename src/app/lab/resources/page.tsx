"use client";

import Link from "next/link";
import { ChevronLeft, PlayCircle, Instagram, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function LabResourcesPage() {
  const labResources = [
    {
      id: 1,
      type: "document",
      title: "[연구보고서] 조선시대 민체(民體)의 조형적 특징과 현대적 활용 방안",
      date: "2026. 03. 15",
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 2,
      type: "youtube",
      title: "새로운 글꼴 '이산 둥근달체' 스케치부터 디지털 폰트가 되기까지",
      date: "2025. 11. 20",
      thumbnail: "https://images.unsplash.com/photo-1544256718-3b61048b8773?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 3,
      type: "instagram",
      title: "연구소 일상: 오래된 서첩을 복원하는 작업실 풍경",
      date: "2025. 09. 08",
      thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      id: 4,
      type: "document",
      title: "캘리그라피 도구론: 붓의 모(毛) 종류에 따른 먹 번짐 현상 연구",
      date: "2025. 05. 12",
      thumbnail: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=800&auto=format&fit=crop",
      link: "#"
    }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'youtube': return <PlayCircle size={18} />;
      case 'instagram': return <Instagram size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'youtube': return 'Video';
      case 'instagram': return 'Social';
      default: return 'Paper';
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
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Lab Resources</p>
            <h1 className="text-4xl md:text-5xl font-serif italic mb-6">연구 자료실</h1>
            <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-xl">
              이산글씨연구소의 서체 개발 과정, 학술 연구 결과 및 <br className="hidden md:block" />
              미디어 자료를 투명하게 공개하고 공유합니다.
            </p>
          </div>
        </motion.div>

        {/* 자료실 리스트 (리스트 형태로 아카이브 느낌 강조) */}
        <div className="border-t border-black/10">
          {labResources.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 py-8 border-b border-black/5 hover:bg-white/50 transition-colors px-4 -mx-4"
            >
              {/* 썸네일 영역 */}
              <div className="w-full md:w-48 aspect-video md:aspect-[4/3] bg-black/5 overflow-hidden relative shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-2 left-2 bg-white/90 text-black p-1.5 flex items-center justify-center shadow-sm">
                  {renderIcon(item.type)}
                </div>
              </div>
              
              {/* 텍스트 영역 */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-widest border border-black/20 px-2 py-0.5 opacity-60">
                    {getTypeLabel(item.type)}
                  </span>
                  <span className="text-[10px] font-mono opacity-40">{item.date}</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-medium leading-relaxed group-hover:text-black/50 transition-colors flex items-center gap-2">
                  {item.title}
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
}