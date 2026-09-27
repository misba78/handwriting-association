"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function GreetingPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* 좌측 타이틀 영역 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5"
          >
            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Greeting</p>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-8">
              손글씨의 <br />
              <span className="italic">아름다움</span>을 <br />
              나누다.
            </h1>
            <div className="w-12 h-[1px] bg-black/20"></div>
          </motion.div>

          {/* 우측 본문 영역 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-7 space-y-8 text-sm md:text-base text-black/70 leading-loose"
          >
            <p>
              안녕하세요. 이산글씨협회에 오신 것을 진심으로 환영합니다.
            </p>
            <p>
              글씨는 곧 그 사람의 마음이자 거울입니다. <br />
              디지털 기술이 발달하여 모든 것이 빠르고 규격화되어 가는 현대 사회 속에서, 
              우리는 종이 위에 먹과 펜으로 정성스레 써 내려가는 '손글씨'의 가치에 주목합니다. 
              그 안에는 글을 쓰는 이의 호흡과 감정, 그리고 고유한 개성이 고스란히 담겨 있기 때문입니다.
            </p>
            <p>
              저희 이산글씨협회는 단순한 기술의 전달을 넘어, 글씨를 통해 자신을 수양하고 
              타인과 따뜻하게 소통하는 문화를 만들어가고자 합니다. 
              서로의 다름을 존중하고, 저마다의 선이 가진 아름다움을 발견하는 여정에 여러분을 초대합니다.
            </p>
            <p>
              앞으로도 끊임없는 연구와 교육, 그리고 다채로운 전시를 통해 
              손글씨 예술의 대중화와 발전에 기여하는 협회가 되겠습니다. 감사합니다.
            </p>
            
            <div className="pt-12 text-right">
              <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">이산글씨협회 이사장</p>
              <p className="text-xl font-serif italic">이 산</p>
            </div>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
}