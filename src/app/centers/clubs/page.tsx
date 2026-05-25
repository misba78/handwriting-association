"use client";

import Link from "next/link";
import { ChevronLeft, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ClubsPage() {
  const clubs = [
    {
      name: "글씨담다",
      area: "서울/수도권",
      time: "매월 둘째 주 토요일",
      desc: "다양한 서체를 연구하고 일상 속 캘리그라피 소품을 함께 만드는 청년 캘리 동아리입니다."
    },
    {
      name: "먹물향기",
      area: "충청/대전",
      time: "매주 목요일 저녁",
      desc: "전통 서예와 현대 캘리그라피의 접목을 연구하며, 매년 정기 소규모 전시를 개최합니다."
    },
    {
      name: "선과 여백",
      area: "부산/영남",
      time: "매월 넷째 주 일요일",
      desc: "풍경 스케치와 글씨를 결합한 작품 활동을 주로 하며, 야외 출사를 즐기는 모임입니다."
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Clubs</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">동아리 소개</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            글씨를 사랑하는 사람들이 모여 함께 성장하고 교류하는 협회 공식 동아리입니다. 
          </p>
        </motion.div>

        <div className="space-y-6 border-t border-black/10 pt-12">
          {clubs.map((club, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border border-black/5 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] bg-black text-white px-2 py-1 uppercase tracking-widest">{club.area}</span>
                  <span className="text-xs text-black/40 flex items-center gap-1"><Users size={12} /> 모임 일정: {club.time}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold">{club.name}</h2>
                <p className="text-sm text-black/60 leading-relaxed max-w-2xl">{club.desc}</p>
              </div>
              
              <button className="shrink-0 flex items-center gap-2 text-xs font-bold border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-colors">
                <MessageCircle size={14} /> 가입 문의
              </button>
            </motion.div>
          ))}
        </div>
        
      </div>
    </div>
  );
}