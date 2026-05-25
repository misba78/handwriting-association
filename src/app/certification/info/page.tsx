"use client";

import Link from "next/link";
import { ChevronLeft, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function CertInfoPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Certification</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">자격증 안내</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed max-w-2xl">
            이산글씨협회가 주관하는 손글씨 자격검정은 체계적인 심사 기준을 통해 <br className="hidden md:block" />
            전문적인 캘리그라피 작가 및 강사로서의 역량을 공식적으로 인증합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start border-t border-black/10 pt-16">
          
          {/* 좌측: 자격증 샘플 이미지 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[3/4] bg-white border border-black/10 p-8 flex flex-col items-center justify-center text-center shadow-sm relative"
          >
            {/* 실제 자격증 이미지(img) 태그로 교체하실 수 있습니다 */}
            <div className="w-[80%] h-full border border-black/5 bg-[#F9F8F5] flex flex-col items-center justify-center p-10 relative">
              <Award size={48} className="text-yellow-600 mb-6 opacity-80" />
              <h2 className="text-3xl font-serif mb-2">자격인증서</h2>
              <p className="text-xs opacity-50 font-mono mb-12">CERTIFICATE OF QUALIFICATION</p>
              
              <div className="w-full space-y-4 text-left">
                <div className="w-full h-[1px] bg-black/10"></div>
                <p className="text-xs"><strong>성명 :</strong> 홍길동</p>
                <p className="text-xs"><strong>종목 :</strong> 캘리그라피 1급</p>
                <div className="w-full h-[1px] bg-black/10"></div>
              </div>
              
              <div className="absolute bottom-10 text-center">
                <p className="text-lg font-serif italic">이산글씨협회</p>
              </div>
            </div>
          </motion.div>

          {/* 우측: 급수별 안내 텍스트 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                <span className="text-sm bg-black text-white px-2 py-1 font-mono">1급</span> 전문가 과정
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                창작 능력과 강의 역량을 두루 갖춘 최고 수준의 전문가를 인증합니다. 
                1급 자격 취득 시 협회 공식 강사로 활동할 수 있는 자격이 주어지며, 
                각종 전시 및 행사 우선 참여 혜택이 제공됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                <span className="text-sm border border-black px-2 py-1 font-mono">2급</span> 심화 과정
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                손글씨의 기초를 탄탄히 다지고 다양한 도구와 구도를 활용하여 
                자신만의 감성을 작품으로 표현할 수 있는 역량을 평가합니다. 
                가장 많은 수강생이 도전하는 실무 중심의 자격증입니다.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                <span className="text-sm border border-black/30 px-2 py-1 font-mono opacity-60">3급</span> 기초 과정 (방과후 강사용)
              </h3>
              <p className="text-sm text-black/60 leading-relaxed">
                기본적인 획의 이해와 펜글씨의 기초를 다룬 입문 단계입니다. 
                어린이집, 방과후 교실 등에서 기초 펜글씨를 지도할 수 있는 기본 소양을 검증합니다.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}