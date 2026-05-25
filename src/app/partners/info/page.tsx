"use client";

import Link from "next/link";
import { ChevronLeft, Building2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnersInfoPage() {
  const partners = [
    {
      name: "한국전통서예협회",
      type: "학술/연구",
      desc: "전통 서예의 계승과 발전을 위해 정기적인 학술 세미나와 공동 연구를 진행합니다.",
      link: "#"
    },
    {
      name: "한글마을 갤러리",
      type: "전시/예술",
      desc: "이산글씨협회의 정기 회원전 및 주요 기획 전시가 열리는 공식 협력 갤러리입니다.",
      link: "#"
    },
    {
      name: "묵향필방 (재료사)",
      type: "기업/후원",
      desc: "협회 공식 지정 캘리그라피 재료 공급사로, 수강생 및 회원들에게 할인 혜택을 제공합니다.",
      link: "#"
    },
    {
      name: "서예문화진흥원",
      type: "공공기관",
      desc: "손글씨 문화 대중화를 위한 국비 지원 교육 프로그램 및 공모전을 공동 주관합니다.",
      link: "#"
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Partners</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">협력기관 소개</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            이산글씨협회와 뜻을 함께하며 아름다운 손글씨 문화를 <br className="hidden md:block"/>
            만들어가는 든든한 동반자들을 소개합니다.
          </p>
        </motion.div>

        {/* 협력기관 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-black/10">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 md:p-10 border border-black/10 flex flex-col justify-between hover:shadow-sm transition-shadow group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-black/40">
                    <Building2 size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest bg-black/5 px-3 py-1 font-bold opacity-60">
                    {partner.type}
                  </span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold mb-4">{partner.name}</h2>
                <p className="text-sm text-black/60 leading-relaxed mb-8 h-12">
                  {partner.desc}
                </p>
              </div>

              <a 
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-t border-black/10 pt-6 group-hover:text-black/50 transition-colors w-max"
              >
                웹사이트 방문하기 <ExternalLink size={12} />
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}