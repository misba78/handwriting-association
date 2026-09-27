"use client";

import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EligibilityPage() {
  const eligibilities = [
    {
      level: "1급",
      title: "전문가 과정",
      target: "강사 활동 및 전문 작가를 희망하는 자",
      requirements: [
        "이산글씨협회 2급 자격증 취득 후 6개월 이상 경과한 자",
        "협회 지정 교육기관에서 1급 심화 과정을 수료한 자",
        "협회 정회원으로 등록되어 있는 자"
      ]
    },
    {
      level: "2급",
      title: "심화 과정",
      target: "캘리그라피의 깊이 있는 예술성을 배우고자 하는 자",
      requirements: [
        "이산글씨협회 3급 자격증 취득자",
        "또는 협회 지정 교육기관에서 2급 정규 과정을 수료한 자",
        "연령 및 학력 제한 없음"
      ]
    },
    {
      level: "3급",
      title: "기초 과정",
      target: "손글씨에 관심 있는 누구나 (방과후 강사 준비 등)",
      requirements: [
        "연령, 학력, 경력 제한 없이 누구나 응시 가능",
        "협회 지정 교육기관 기초 과정 수료자 우대"
      ]
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Eligibility</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">응시자격</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            각 급수별 자격검정 시험에 응시하기 위한 기본 요건 안내입니다.
          </p>
        </motion.div>

        {/* 급수별 응시자격 카드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {eligibilities.map((item, index) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white border border-black/10 p-8 flex flex-col hover:border-black/30 transition-colors shadow-sm"
            >
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-black/10">
                <h2 className="text-4xl font-serif">{item.level}</h2>
                <span className="text-sm font-bold opacity-60 mb-1">{item.title}</span>
              </div>
              
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">응시 대상</p>
                <p className="text-sm text-black/80 font-medium leading-relaxed">{item.target}</p>
              </div>

              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">자격 요건</p>
                <ul className="space-y-4 text-sm text-black/70">
                  {item.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 opacity-40" />
                      <span>{req}</span>
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