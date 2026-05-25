"use client";

import Link from "next/link";
import { ChevronLeft, Check, CreditCard, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MembershipPage() {
  const benefits = [
    "협회 주관 정기 회원전 출품 자격 부여",
    "각종 세미나, 특강 및 워크샵 우선 참여 및 참가비 할인",
    "협회 공식 캘리그라피 자격검정 응시료 할인",
    "제휴 필방(재료사) 이용 시 상시 할인 혜택",
    "협회 공식 홈페이지 내 개인 작품 포트폴리오(Works) 등재"
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Membership</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">회원가입 및 회비 안내</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            이산글씨협회의 가족이 되어 다채로운 예술 활동과 풍성한 혜택을 누려보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/10 pt-16">
          
          {/* 좌측: 회비 및 계좌 정보 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 space-y-8"
          >
            <div className="bg-white p-8 border border-black/10 shadow-sm">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <CreditCard size={18} className="opacity-40" /> 연회비 안내
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-black/5 pb-4">
                  <span className="text-sm text-black/60">가입비 (최초 1회)</span>
                  <span className="font-bold">50,000원</span>
                </div>
                <div className="flex justify-between items-center border-b border-black/5 pb-4">
                  <span className="text-sm text-black/60">연회비</span>
                  <span className="font-bold">120,000원</span>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] text-black/40 leading-relaxed">
                    ※ 가입 첫해에는 가입비와 연회비가 함께 청구되며, 이듬해부터는 연회비만 납부하시면 됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black text-white p-8">
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2">납부 계좌</p>
              <p className="text-lg font-mono mb-4">국민은행 123-456-789012</p>
              <p className="text-sm opacity-80">예금주 : 사단법인 이산글씨협회</p>
            </div>
          </motion.div>

          {/* 우측: 정회원 혜택 및 가입 버튼 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-7 flex flex-col"
          >
            <h2 className="text-2xl font-serif mb-8">정회원 주요 혜택</h2>
            <ul className="space-y-6 flex-1">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4 text-sm text-black/70 leading-relaxed">
                  <div className="bg-black/5 p-1 rounded-full shrink-0 mt-0.5">
                    <Check size={14} className="text-black" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-12 pt-8 border-t border-black/10">
              <p className="text-sm text-black/60 mb-6">
                회비 입금 후 아래 버튼을 눌러 온라인 회원가입을 진행해 주시면, <br className="hidden md:block"/>
                관리자 승인 후 정회원 자격이 부여됩니다.
              </p>
              <Link href="/signup" className="group inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors">
                회원가입 하러가기 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}