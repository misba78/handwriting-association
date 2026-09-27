"use client";

import Link from "next/link";
import { ChevronLeft, MapPin, Phone, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CentersInfoPage() {
  const centers = [
    {
      region: "서울/경기",
      name: "경기 남부 센터",
      director: "김서예 센터장",
      address: "경기도 수원시 팔달구 권광로 123",
      tel: "031-123-4567"
    },
    {
      region: "충청/대전",
      name: "대전 충청 센터",
      director: "이붓펜 센터장",
      address: "대전광역시 서구 둔산대로 456",
      tel: "042-234-5678"
    },
    {
      region: "경상/부산",
      name: "부산 경남 센터",
      director: "박먹물 센터장",
      address: "부산광역시 부산진구 중앙대로 789",
      tel: "051-345-6789"
    },
    {
      region: "전라/광주",
      name: "광주 호남 센터",
      director: "최한글 센터장",
      address: "광주광역시 동구 예술길 12",
      tel: "062-456-7890"
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
          className="mb-16 text-center md:text-left"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Centers</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">센터 소개</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            전국 각지에서 이산글씨협회의 뜻을 이어가는 공식 지역 센터를 안내합니다. 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/10 pt-12">
          {centers.map((center, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 border border-black/10 hover:border-black/40 transition-colors group"
            >
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">
                {center.region}
              </div>
              <h2 className="text-2xl font-serif mb-6">{center.name}</h2>
              
              <div className="space-y-3 text-sm text-black/70 mb-8 border-b border-black/5 pb-8">
                <p className="flex items-center gap-3">
                  <User size={16} className="opacity-40" /> {center.director}
                </p>
                <p className="flex items-center gap-3">
                  <MapPin size={16} className="opacity-40" /> {center.address}
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={16} className="opacity-40" /> {center.tel}
                </p>
              </div>

              <button className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                상담 문의하기 <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}