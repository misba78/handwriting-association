"use client";

import Link from "next/link";
import { ChevronLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ExternalSchedulePage() {
  const externalEvents = [
    {
      id: 1,
      type: "공모전",
      title: "제10회 대한민국 캘리그라피 대전",
      host: "한국캘리그라피협회",
      period: "2026. 06. 01 ~ 06. 30",
      location: "온라인 접수",
      link: "#"
    },
    {
      id: 2,
      type: "전시",
      title: "먹빛, 현대 미술을 만나다展",
      host: "국립현대미술관",
      period: "2026. 07. 15 ~ 08. 15",
      location: "국립현대미술관 서울관",
      link: "#"
    },
    {
      id: 3,
      type: "공모전",
      title: "2026 한글날 기념 예쁜 손글씨 공모전",
      host: "세종대왕기념사업회",
      period: "2026. 09. 01 ~ 09. 25",
      location: "우편 접수",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">External Schedule</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">전시/공모전 일정</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            협회 행사 외에도 회원분들의 작품 활동에 도움이 될 만한 <br className="hidden md:block"/>
            전국 주요 캘리그라피 전시 및 공모전 정보를 공유합니다.
          </p>
        </motion.div>

        {/* 일정 리스트 */}
        <div className="border-t border-black/10">
          {externalEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-10 border-b border-black/5 flex flex-col md:flex-row gap-6 md:gap-12 group hover:bg-white/50 transition-colors px-4 -mx-4"
            >
              {/* 분류 뱃지 */}
              <div className="shrink-0 pt-1">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-4 py-2 ${
                  item.type === '공모전' ? 'bg-black text-white' : 'border border-black/20 text-black'
                }`}>
                  {item.type}
                </span>
              </div>
              
              {/* 상세 정보 */}
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-serif font-bold group-hover:text-black/60 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-black/50">주최: {item.host}</p>
                
                <div className="flex flex-wrap gap-6 pt-4 text-xs text-black/60">
                  <p className="flex items-center gap-1.5"><CalendarDays size={14} className="opacity-40" /> {item.period}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={14} className="opacity-40" /> {item.location}</p>
                </div>
              </div>

              {/* 외부 링크 버튼 */}
              <div className="shrink-0 flex items-center md:items-start pt-2">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-black/20 pb-1 hover:border-black transition-colors"
                >
                  상세보기 <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}