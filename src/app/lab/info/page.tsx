"use client";

import Link from "next/link";
import { ChevronLeft, PenTool, Search, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function LabInfoPage() {
  const researchAreas = [
    {
      icon: <Search size={24} strokeWidth={1.5} />,
      title: "고전 서체 연구 및 현대화",
      desc: "조선시대 궁체, 판본체 및 과거 명필들의 서간문을 분석하여 획의 특징을 연구하고, 이를 현대적 캘리그라피로 재해석하는 작업을 진행합니다."
    },
    {
      icon: <PenTool size={24} strokeWidth={1.5} />,
      title: "새로운 한글 글꼴(폰트) 개발",
      desc: "디지털 환경에서도 아날로그 손글씨의 따뜻함과 조형미가 유지될 수 있도록, 독창적이고 가독성 높은 상업용/무료 한글 폰트를 기획하고 제작합니다."
    },
    {
      icon: <BookOpen size={24} strokeWidth={1.5} />,
      title: "표준 교육 커리큘럼 설계",
      desc: "누구나 체계적이고 쉽게 손글씨를 배울 수 있도록 연령별, 수준별 맞춤형 교재를 개발하고 효과적인 교수법을 연구합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        {/* 상단 타이틀 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end border-b border-black/10 pb-16"
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Laboratory</p>
            <h1 className="text-4xl md:text-5xl font-serif italic mb-6">연구소 안내</h1>
            <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-xl">
              이산글씨연구소는 한글이 가진 고유한 선의 아름다움을 탐구하고, <br className="hidden md:block" />
              시대를 뛰어넘는 가치를 지닌 문자로 발전시키기 위해 끊임없이 연구합니다.
            </p>
          </div>
          
          <div className="text-right shrink-0">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Since</p>
            <p className="text-3xl font-serif">2018</p>
          </div>
        </motion.div>

        {/* 핵심 연구 분야 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-sm font-bold uppercase tracking-widest mb-10">핵심 연구 분야</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {researchAreas.map((area, index) => (
              <div key={index} className="flex flex-col">
                <div className="w-12 h-12 bg-white border border-black/10 rounded-full flex items-center justify-center mb-6 text-black/60 shadow-sm">
                  {area.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{area.title}</h3>
                <div className="w-8 h-[1px] bg-black/20 mb-4"></div>
                <p className="text-sm text-black/60 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}