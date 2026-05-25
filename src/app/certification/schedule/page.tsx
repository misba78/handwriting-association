"use client";

import Link from "next/link";
import { ChevronLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function SchedulePage() {
  // 2026년 가상의 시험 일정 데이터
  const schedules = [
    {
      round: "제 12회",
      period: "2026. 02. 01 ~ 02. 15",
      examDate: "2026. 03. 10 (토)",
      resultDate: "2026. 03. 25",
      status: "마감"
    },
    {
      round: "제 13회",
      period: "2026. 06. 01 ~ 06. 15",
      examDate: "2026. 07. 12 (토)",
      resultDate: "2026. 07. 28",
      status: "접수중"
    },
    {
      round: "제 14회",
      period: "2026. 10. 01 ~ 10. 15",
      examDate: "2026. 11. 08 (토)",
      resultDate: "2026. 11. 24",
      status: "예정"
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Schedule</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">시험일정</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            2026년도 자격검정 시험 일정입니다. <br className="hidden md:block"/>
            일정은 주최 측의 사정에 따라 일부 변경될 수 있습니다.
          </p>
        </motion.div>

        {/* 일정 리스트 영역 */}
        <div className="border-t border-black/10">
          {schedules.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-10 border-b border-black/5 flex flex-col md:flex-row md:items-center gap-8 group hover:bg-white/50 transition-colors px-4 -mx-4"
            >
              {/* 회차 및 상태 배지 */}
              <div className="w-40 shrink-0">
                <h3 className="text-3xl font-serif mb-3">{item.round}</h3>
                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 font-bold ${
                  item.status === '접수중' ? 'bg-black text-white' : 
                  item.status === '마감' ? 'bg-black/10 text-black/40' : 
                  'border border-black/20 text-black/60'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* 상세 일정 정보 */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">접수기간</p>
                  <p className="font-medium">{item.period}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1 flex items-center gap-1">
                    <Clock size={10} /> 시험일자
                  </p>
                  <p className="font-bold">{item.examDate}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">합격자 발표</p>
                  <p className="font-medium text-black/70">{item.resultDate}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 유의사항 */}
        <div className="mt-16 p-6 md:p-8 bg-black/5 text-xs text-black/60 leading-loose">
          <p className="font-bold text-black mb-2">※ 시험 응시 유의사항</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>원서 접수는 마감일 18:00까지 제출된 건에 한하여 유효합니다.</li>
            <li>시험 장소 및 수험번호는 접수 마감 후 개별 문자로 안내됩니다.</li>
            <li>응시 취소 및 환불은 시험일 7일 전까지만 가능합니다.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}