"use client";

import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function ApplyPage() {
  const courses = [
    {
      title: "정규 기초 과정",
      duration: "주 1회 / 총 12주 (3개월)",
      price: "450,000원",
      desc: "캘리그라피를 처음 접하시는 분들을 위한 입문 과정입니다. 선 긋기부터 판본체, 궁체 등 기본 서체를 익히고 짧은 문장 쓰기를 완성합니다."
    },
    {
      title: "심화 마스터 과정",
      duration: "주 1회 / 총 16주 (4개월)",
      price: "680,000원",
      desc: "기초 과정을 수료하신 분들을 위한 과정입니다. 다양한 도구 활용법과 구도 잡기, 긴 문장 쓰기 및 나만의 작품 창작을 진행합니다."
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Application</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">수강신청</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            이산글씨학교의 정규 교육 과정 안내 및 수강료 정보입니다.
          </p>
        </motion.div>

        {/* 수강료 및 코스 안내 */}
        <div className="space-y-6 border-t border-black/10 pt-12 mb-20">
          {courses.map((course, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 md:p-10 border border-black/10 flex flex-col md:flex-row gap-8 justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-serif font-bold">{course.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{course.desc}</p>
                <p className="text-[11px] font-mono opacity-50 bg-black/5 inline-block px-3 py-1">{course.duration}</p>
              </div>
              
              <div className="shrink-0 md:text-right border-t md:border-t-0 md:border-l border-black/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">수강료 (재료비 별도)</p>
                <p className="text-3xl font-serif">{course.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 등록 절차 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl font-serif mb-8 border-b border-black/10 pb-4">등록 절차 안내</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "전화/방문 상담", desc: "원하시는 지점에 연락하여 수강 가능 요일과 시간을 상담합니다." },
              { step: "02", title: "수강료 결제", desc: "안내받은 계좌로 수강료를 입금하시거나 방문하여 결제합니다." },
              { step: "03", title: "수강 확정", desc: "결제가 완료되면 수강 등록이 확정되며 개강 안내 문자가 발송됩니다." }
            ].map((proc, i) => (
              <div key={i} className="bg-black/5 p-6 space-y-3">
                <span className="text-[10px] font-bold font-mono opacity-40 pb-2 border-b border-black/10 block">STEP {proc.step}</span>
                <h4 className="font-bold text-sm">{proc.title}</h4>
                <p className="text-xs text-black/60 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs text-black/50 bg-white p-4 border border-black/10">
            <Info size={14} className="shrink-0" />
            <p>온라인 수강신청 시스템은 현재 준비 중입니다. 당분간은 각 지역 센터로 직접 문의해 주시기 바랍니다.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}