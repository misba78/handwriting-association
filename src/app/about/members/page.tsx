"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function MembersPage() {
  // 테스트용 명단 데이터 (나중에 실제 이름들로 변경)
  const directors = ["김서예", "이붓펜", "박먹물", "최한글", "정캘리"];
  const regularMembers = [
    "강나라", "고다람", "곽도원", "구미호", "권기본", "김가네", "나비야", "노랑이", 
    "도토리", "류현진", "마동석", "박보검", "배수지", "백종원", "서강준", "손흥민", 
    "신동엽", "안성기", "양세형", "오달수", "유재석", "윤여정", "이광수", "임창정",
    "전지현", "조진웅", "차승원", "최민식", "하정우", "한지민", "황정민", "홍길동"
  ];

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
          className="mb-24"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Members</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">총회명단</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            이산글씨협회의 뜻을 함께하며 손글씨 문화를 이끌어가는 회원 명단입니다.
          </p>
        </motion.div>

        {/* 명단 리스트 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-20"
        >
          {/* 임원진 섹션 */}
          <section className="border-t border-black/10 pt-10">
            <h2 className="text-[10px] uppercase tracking-widest font-bold mb-8">임원진 (Board of Directors)</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-lg font-serif">
              {directors.map((name, i) => (
                <span key={i}>{name}</span>
              ))}
            </div>
          </section>

          {/* 정회원 섹션 (가나다 순 4단 그리드) */}
          <section className="border-t border-black/10 pt-10">
            <h2 className="text-[10px] uppercase tracking-widest font-bold mb-8 flex justify-between items-end">
              <span>정회원 (Regular Members)</span>
              <span className="font-normal opacity-40 lowercase">가나다 순</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-4 text-base text-black/80">
              {regularMembers.map((name, i) => (
                <div key={i} className="py-2 border-b border-black/5 hover:bg-black/5 transition-colors px-2">
                  {name}
                </div>
              ))}
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  );
}