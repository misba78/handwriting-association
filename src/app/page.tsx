"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#F9F8F5] text-[#2C2C2C] min-h-screen">
      
      {/* 1. 히어로 섹션 (메인 비주얼) */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-20 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-8xl font-serif tracking-tighter leading-tight mb-6">
            Handwriting<br />
            <span className="italic opacity-70">Association.</span>
          </h1>
          <p className="text-sm md:text-lg opacity-60 max-w-md leading-relaxed mb-12 font-medium">
            손글씨의 아름다움을 연구하고, <br className="hidden md:block"/>
            그 가치를 널리 알리는 이산글씨협회입니다.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 border-b border-black pb-1 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity">
            Explore Association <ArrowRight size={14} />
          </Link>
        </motion.div>
        
        {/* 장식용 배경 효과 */}
        <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-black/5 rounded-tl-[100%] blur-3xl -z-0 pointer-events-none"></div>
      </section>

      {/* 2. 퀵 링크 섹션 (주요 카테고리 안내) */}
      <section className="py-32 px-6 md:px-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          
          {/* 블록 1: 이산글씨학교 */}
          <div className="group">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">01 / Education</p>
            <h2 className="text-3xl font-serif mb-4">이산글씨학교</h2>
            <p className="text-sm opacity-60 mb-8 md:h-12 leading-relaxed">
              체계적인 교육 과정을 통해 손글씨의 기초부터 전문가 과정까지 배울 수 있습니다.
            </p>
            <Link href="/school" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group-hover:pl-2 transition-all">
              Learn More <ArrowRight size={12} />
            </Link>
          </div>

          {/* 블록 2: 자격검정 */}
          <div className="group">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">02 / Certification</p>
            <h2 className="text-3xl font-serif mb-4">자격검정</h2>
            <p className="text-sm opacity-60 mb-8 md:h-12 leading-relaxed">
              공신력 있는 자격 검정을 통해 손글씨 전문가로서의 역량을 증명하고 나아가세요.
            </p>
            <Link href="/certification" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group-hover:pl-2 transition-all">
              Apply Now <ArrowRight size={12} />
            </Link>
          </div>

          {/* 블록 3: 전시 및 행사 */}
          <div className="group">
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">03 / News & Events</p>
            <h2 className="text-3xl font-serif mb-4">전시 및 공모전</h2>
            <p className="text-sm opacity-60 mb-8 md:h-12 leading-relaxed">
              협회원들의 다양한 작품 전시와 공모전, 그리고 주요 소식을 가장 먼저 확인하세요.
            </p>
            <Link href="/activities" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group-hover:pl-2 transition-all">
              View Events <ArrowRight size={12} />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}