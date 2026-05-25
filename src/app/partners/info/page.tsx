import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] pt-40 pb-20 px-6 md:px-12 text-[#2C2C2C]">
      <div className="max-w-6xl mx-auto">
        {/* 뒤로 가기 및 현재 위치 표시 영역 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>
        
        {/* 페이지 타이틀 (나중에 각 페이지에 맞게 수정될 부분) */}
        <h1 className="text-4xl md:text-5xl font-serif italic mb-6">
          Page under construction
        </h1>
        
        {/* 본문 영역 */}
        <div className="w-8 h-[1px] bg-black/20 mb-6"></div>
        <p className="text-sm md:text-base text-black/60 leading-relaxed">
          현재 콘텐츠를 준비 중입니다. <br className="md:hidden" />
          조금만 기다려 주세요.
        </p>
      </div>
    </div>
  );
}