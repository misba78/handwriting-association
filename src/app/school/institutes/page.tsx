"use client";

import Link from "next/link";
import { ChevronLeft, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function InstitutesPage() {
  const institutes = [
    {
      name: "서울 본원 (홍대)",
      address: "서울특별시 마포구 홍익로 10, 이산빌딩 3층",
      tel: "02-1234-5678",
      director: "이산",
      isMain: true
    },
    {
      name: "경기 남부 센터 (수원)",
      address: "경기도 수원시 팔달구 권광로 123, 캘리타워 2층",
      tel: "031-234-5678",
      director: "김서예"
    },
    {
      name: "부산 센터 (서면)",
      address: "부산광역시 부산진구 중앙대로 456, 아트빌딩 4층",
      tel: "051-345-6789",
      director: "박먹물"
    },
    {
      name: "대구 센터 (동성로)",
      address: "대구광역시 중구 국채보상로 789, 글씨빌딩 1층",
      tel: "053-456-7890",
      director: "최한글"
    }
  ];

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
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Institutes</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">교육기관</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            전국 어디서나 이산글씨학교의 체계적인 커리큘럼을 만나보실 수 있습니다.
          </p>
        </motion.div>

        {/* 교육기관 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-black/10">
          {institutes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 md:p-10 border transition-colors hover:border-black/30 flex flex-col justify-between ${
                item.isMain ? 'bg-black text-white border-black' : 'bg-white border-black/10 text-black'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-2xl font-serif">{item.name}</h2>
                  {item.isMain && (
                    <span className="text-[9px] uppercase tracking-widest border border-white/30 px-2 py-1">Main Campus</span>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className={`flex items-start gap-3 text-sm ${item.isMain ? 'text-white/70' : 'text-black/60'}`}>
                    <MapPin size={16} className="shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{item.address}</p>
                  </div>
                  <div className={`flex items-center gap-3 text-sm ${item.isMain ? 'text-white/70' : 'text-black/60'}`}>
                    <Phone size={16} className="shrink-0" />
                    <p>{item.tel}</p>
                  </div>
                </div>
              </div>

              <div className={`mt-10 pt-6 border-t ${item.isMain ? 'border-white/20 text-white/50' : 'border-black/10 text-black/40'} text-xs font-medium flex justify-between`}>
                <span>대표 원장</span>
                <span>{item.director}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}