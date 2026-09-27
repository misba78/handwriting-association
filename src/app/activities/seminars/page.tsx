"use client";

import Link from "next/link";
import { ChevronLeft, Presentation, MapPin, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function SeminarsPage() {
  const seminars = [
    {
      id: 1,
      title: "제5회 캘리그라피와 한글 디자인 학술 세미나",
      theme: "디지털 시대, 아날로그 손글씨의 방향성",
      date: "2025. 11. 15 (토)",
      location: "국립한글박물관 강당",
      status: "종료"
    },
    {
      id: 2,
      title: "전국 지역 센터장 교육 워크샵",
      theme: "표준 커리큘럼의 이해와 효과적인 교수법",
      date: "2025. 08. 20 (일)",
      location: "이산글씨학교 서울 본원",
      status: "종료"
    },
    {
      id: 3,
      title: "2026 캘리그라피 트렌드 포럼",
      theme: "전통 서예와 현대 미술의 경계를 넘어",
      date: "2026. 10. 10 (토)",
      location: "서울시립미술관 세미나실",
      status: "예정"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Seminars</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">교육/세미나</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            한글의 아름다움을 연구하고 손글씨 문화를 발전시키기 위해 <br className="hidden md:block"/>
            협회가 주최하는 다양한 학술 세미나 및 교육 워크샵 기록입니다.
          </p>
        </motion.div>

        {/* 세미나 리스트 */}
        <div className="border-t border-black/10 pt-4">
          {seminars.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-10 border-b border-black/5 flex flex-col md:flex-row gap-6 md:gap-12 group hover:bg-white/50 transition-colors px-4 -mx-4 cursor-default"
            >
              {/* 상태 뱃지 */}
              <div className="shrink-0 pt-1 w-24">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 ${
                  item.status === '예정' ? 'bg-black text-white' : 'border border-black/20 text-black/40'
                }`}>
                  {item.status}
                </span>
              </div>
              
              {/* 세미나 정보 */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-black/40 mb-1">
                  <Presentation size={14} />
                  <span>{item.theme}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold group-hover:text-black/60 transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex flex-wrap gap-6 pt-4 text-xs text-black/60">
                  <p className="flex items-center gap-1.5"><CalendarDays size={14} className="opacity-40" /> {item.date}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={14} className="opacity-40" /> {item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}