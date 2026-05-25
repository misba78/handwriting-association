"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function OrganizationPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Organization</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">조직도</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            체계적이고 투명한 운영을 통해 협회의 비전을 실현해 나갑니다.
          </p>
        </motion.div>

        {/* 조직도 트리 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* 최고 의결 기구 */}
          <div className="border border-black px-12 py-6 text-center bg-white shadow-sm z-10 w-full md:w-auto">
            <h2 className="text-[10px] font-mono opacity-50 mb-2">총회</h2>
            <p className="text-xl font-serif">최고 의결 기구</p>
          </div>
          
          {/* 연결선 */}
          <div className="w-[1px] h-12 bg-black"></div>
          
          {/* 이사장 및 이사회 */}
          <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            <div className="border border-black px-12 py-6 text-center bg-white shadow-sm flex-1">
              <h2 className="text-[10px] font-mono opacity-50 mb-2">이사장</h2>
              <p className="text-xl font-serif">이 산</p>
            </div>
            <div className="hidden md:block w-12 border-t border-black self-center"></div>
            <div className="border border-black/20 px-12 py-6 text-center bg-transparent flex-1">
              <h2 className="text-[10px] font-mono opacity-50 mb-2">이사회</h2>
              <p className="text-xl font-serif">협회 임원진</p>
            </div>
          </div>

          {/* 연결선 */}
          <div className="w-[1px] h-12 bg-black"></div>
          <div className="w-full max-w-3xl border-t border-black"></div>
          
          {/* 하위 분과 위원회 및 센터 */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 pt-12">
            {[
              { title: "교육 위원회", desc: "자격검정 및 교재 연구" },
              { title: "전시 기획팀", desc: "정기전 및 공모전 운영" },
              { title: "홍보 위원회", desc: "온/오프라인 홍보 채널 관리" },
              { title: "지역 센터", desc: "전국 센터 및 동아리 지원" },
            ].map((dept, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-[1px] h-6 bg-black mb-4"></div>
                <div className="w-full border border-black/10 bg-white p-6 text-center hover:border-black transition-colors cursor-default">
                  <h3 className="text-lg font-bold mb-2">{dept.title}</h3>
                  <p className="text-xs text-black/50">{dept.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}