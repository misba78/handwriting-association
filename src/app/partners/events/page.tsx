"use client";

import Link from "next/link";
import { ChevronLeft, Handshake, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnerEventsPage() {
  const partnerEvents = [
    {
      id: 1,
      date: "2025. 10. 12",
      partner: "한글마을 갤러리",
      title: "협회 공식 갤러리 지정 및 MOU 체결식",
      desc: "이산글씨협회와 한글마을 갤러리가 양해각서(MOU)를 체결하고, 향후 3년간 협회의 모든 정기 전시를 해당 갤러리에서 우선 개최하기로 협의했습니다."
    },
    {
      id: 2,
      date: "2025. 08. 20",
      partner: "묵향필방",
      title: "캘리그라피 도구 후원 협약",
      desc: "묵향필방과 협약을 맺고, 이산글씨학교 정규 수강생들에게 첫 입문용 붓과 먹물을 무상 지원하는 '스타터 팩' 캠페인을 시작했습니다."
    },
    {
      id: 3,
      date: "2024. 11. 05",
      partner: "서예문화진흥원",
      title: "제1회 전국 한글 사랑 손글씨 대회 공동 주관",
      desc: "서예문화진흥원과 함께 전국 초/중/고등학생을 대상으로 한 한글 손글씨 대회를 성황리에 개최하고 심사를 진행했습니다."
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
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Partner Events</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">행사내용</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            협력기관과 함께 만들어낸 의미 있는 발자취와 주요 행사 소식입니다.
          </p>
        </motion.div>

        {/* 협력 행사 리스트 */}
        <div className="border-t border-black/10">
          {partnerEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="py-10 border-b border-black/5 grid grid-cols-1 md:grid-cols-4 gap-6 items-start group"
            >
              {/* 날짜 및 아이콘 */}
              <div className="text-[11px] opacity-60 flex items-center gap-1 font-mono pt-1 font-bold">
                <Calendar size={12} className="opacity-50" />
                {item.date}
              </div>
              
              {/* 행사 내용 */}
              <div className="md:col-span-3 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-black/50 mb-2">
                  <Handshake size={14} />
                  <span>With {item.partner}</span>
                </div>
                <h3 className="text-2xl font-serif tracking-tight group-hover:opacity-60 transition-opacity">
                  {item.title}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}