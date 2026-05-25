"use client";

import Link from "next/link";
import { ChevronLeft, PenTool, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function MethodPage() {
  const methods = [
    {
      level: "1급",
      type: "실기 및 포트폴리오 심사",
      details: [
        "제시된 주제에 맞는 창작 캘리그라피 작품 2점 현장 제작 (120분)",
        "사전 제출한 포트폴리오 (작품 10점 이상) 심사",
        "작품의 창의성, 구도, 조형성 및 강사로서의 지도 역량 종합 평가"
      ],
      criteria: "총점 100점 만점 기준 80점 이상 합격"
    },
    {
      level: "2급",
      type: "실기 평가",
      details: [
        "지정된 문구와 자유 문구를 활용한 작품 2점 현장 제작 (90분)",
        "다양한 도구(붓, 펜 등)의 활용 능력 및 선의 표현력 평가",
        "여백의 미와 전체적인 구도의 균형성 심사"
      ],
      criteria: "총점 100점 만점 기준 70점 이상 합격"
    },
    {
      level: "3급",
      type: "실기 평가",
      details: [
        "기본 서체(판본체, 궁체 등) 임서 및 응용 작품 1점 현장 제작 (60분)",
        "펜글씨의 기초적인 획의 굵기 조절 및 필압 이해도 평가"
      ],
      criteria: "총점 100점 만점 기준 60점 이상 합격"
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Method</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">전형방법</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            급수별 시험 진행 방식과 평가 기준을 안내해 드립니다.
          </p>
        </motion.div>

        {/* 전형방법 리스트 */}
        <div className="border-t border-black/10">
          {methods.map((item, index) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-12 border-b border-black/5 flex flex-col md:flex-row gap-8 md:gap-12 group"
            >
              {/* 좌측 급수 및 유형 */}
              <div className="w-full md:w-48 shrink-0">
                <h2 className="text-3xl font-serif mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 bg-black text-white flex items-center justify-center text-lg rounded-full">
                    {item.level.replace('급', '')}
                  </span>
                  급
                </h2>
                <div className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 opacity-60">
                  <PenTool size={12} /> {item.type}
                </div>
              </div>

              {/* 우측 상세 내용 및 합격 기준 */}
              <div className="flex-1 space-y-8 mt-2 md:mt-0">
                <ul className="space-y-4">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-black/70 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-black/20 before:rounded-sm">
                      {detail}
                    </li>
                  ))}
                </ul>
                
                <div className="bg-white p-5 border border-black/10 flex items-start md:items-center gap-4 text-sm font-medium">
                  <div className="bg-black/5 p-2 rounded-full shrink-0">
                    <BookOpen size={16} className="text-black/60" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-40 block md:inline md:mr-2 mb-1 md:mb-0">합격 기준</span>
                    {item.criteria}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}