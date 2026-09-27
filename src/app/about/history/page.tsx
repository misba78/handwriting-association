"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryPage() {
  // 연혁 데이터 (나중에 실제 데이터로 수정하세요)
  const historyData = [
    {
      year: "2024",
      events: ["제5회 이산글씨협회 정기 회원전 개최", "전국 캘리그라피 공모전 주관"]
    },
    {
      year: "2023",
      events: ["이산글씨학교 심화 마스터 과정 신설", "손글씨 자격검정 1급, 2급 제정 및 1회 시험 실시"]
    },
    {
      year: "2021",
      events: ["협회 산하 지역별 센터 및 동아리 발족", "온라인 갤러리 및 교육 자료실 오픈"]
    },
    {
      year: "2018",
      events: ["이산글씨연구소 설립", "다수의 외부 기관 및 기업체 협력 교육 진행"]
    },
    {
      year: "2015",
      events: ["이산글씨협회 창립 및 초대 임원진 구성", "손글씨 대중화를 위한 첫 세미나 개최"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">History</p>
          <h1 className="text-4xl md:text-5xl font-serif italic">연혁</h1>
        </motion.div>

        {/* 타임라인 영역 */}
        <div className="relative border-l border-black/10 ml-2 md:ml-4 py-8">
          {historyData.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="mb-16 last:mb-0 relative pl-8 md:pl-16"
            >
              {/* 타임라인 포인트(점) */}
              <div className="absolute w-2 h-2 bg-black rounded-full left-[-4.5px] top-3"></div>
              
              <div className="flex flex-col md:flex-row md:gap-12 items-start">
                <h3 className="text-3xl font-serif mb-4 md:mb-0 md:w-32 shrink-0">{item.year}</h3>
                <ul className="space-y-4">
                  {item.events.map((event, idx) => (
                    <li key={idx} className="text-sm md:text-base text-black/70 leading-relaxed relative before:content-[''] before:absolute before:left-[-12px] before:top-2.5 before:w-1 before:h-1 before:bg-black/20 before:rounded-full">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}