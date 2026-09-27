"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PurposePage() {
  const purposes = [
    {
      num: "01",
      title: "손글씨 문화의 대중화",
      desc: "누구나 쉽게 손글씨의 매력을 접하고 배울 수 있는 체계적인 교육 환경을 제공하여, 올바르고 아름다운 손글씨 문화를 우리 사회 전반에 확산시킵니다."
    },
    {
      num: "02",
      title: "전문 예술인 양성 및 지원",
      desc: "자격검정 제도와 심화 과정을 통해 역량 있는 손글씨 작가와 강사를 배출하며, 창작 활동과 전시를 적극 지원하여 예술인들의 자립과 성장을 돕습니다."
    },
    {
      num: "03",
      title: "전통과 현대의 조화로운 발전",
      desc: "전통 서예의 깊이 있는 예술성을 계승하는 동시에, 현대적인 감각과 실용성을 더한 캘리그라피 및 손글씨 연구를 통해 서예 예술의 새로운 패러다임을 제시합니다."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-24 md:text-center"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Purpose</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">설립목적</h1>
          <p className="text-sm md:text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
            이산글씨협회는 문자가 가진 고유한 조형미를 연구하고, <br className="hidden md:block" />
            이를 바탕으로 아름다운 손글씨 문화를 널리 꽃피우기 위해 설립되었습니다.
          </p>
        </motion.div>

        {/* 3가지 핵심 목적 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-black/10 pt-16">
          {purposes.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="text-[10px] font-mono opacity-30 mb-6 pb-4 border-b border-black/5">
                {item.num} / VISION
              </div>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-sm text-black/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}