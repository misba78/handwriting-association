"use client";

import Link from "next/link";
import { ChevronLeft, Calendar, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function SpecialLecturePage() {
  // 특강 목업 데이터 (추후 Supabase DB와 연동 가능)
  const lectures = [
    {
      id: 1,
      title: "한글 캘리그라피와 전각의 만남",
      instructor: "이산 이사장",
      date: "2026. 06. 20 (토) 14:00 - 17:00",
      location: "서울 본원 (홍대)",
      status: "모집중",
      imgUrl: "https://images.unsplash.com/photo-1584661156681-540e14a1fa83?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "아이패드를 활용한 디지털 손글씨",
      instructor: "김서예 마스터",
      date: "2026. 07. 05 (일) 13:00 - 16:00",
      location: "경기 남부 센터 (수원)",
      status: "예정",
      imgUrl: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "여름맞이 부채 캘리그라피 원데이 클래스",
      instructor: "박먹물 강사",
      date: "2026. 05. 10 (일) 14:00 - 16:00",
      location: "부산 센터",
      status: "마감",
      imgUrl: "https://images.unsplash.com/photo-1517409217036-749e75556214?q=80&w=800&auto=format&fit=crop"
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Special Lecture</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">특강</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            새로운 도구와 기법을 단기간에 배워볼 수 있는 다채로운 특강을 안내합니다.
          </p>
        </motion.div>

        {/* 특강 리스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-black/10 pt-12">
          {lectures.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col h-full bg-white border border-black/5 hover:shadow-md transition-all duration-300"
            >
              {/* 이미지 영역 */}
              <div className="relative aspect-video overflow-hidden bg-black/5">
                <img src={item.imgUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white ${
                  item.status === '모집중' ? 'bg-black' : item.status === '마감' ? 'bg-black/40' : 'bg-yellow-500'
                }`}>
                  {item.status}
                </div>
              </div>

              {/* 텍스트 정보 영역 */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif font-bold mb-4 line-clamp-2 group-hover:text-black/60 transition-colors">
                  {item.title}
                </h3>
                
                <div className="mt-auto space-y-2 text-xs text-black/60">
                  <p className="flex items-center gap-2"><User size={14} className="opacity-50" /> {item.instructor}</p>
                  <p className="flex items-center gap-2"><Calendar size={14} className="opacity-50" /> {item.date}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} className="opacity-50" /> {item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}