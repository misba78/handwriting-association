"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";

// 데이터 일관성을 위해 이전과 동일한 샘플 데이터 (실제로는 API나 DB에서 불러옵니다)
const WORKS_DATA: Record<string, any> = {
  "1": { title: "봄의 숨결", artist: "김서예", category: "한글 서예", year: "2024", tools: "세필붓, 수제 한지, 먹물", desc: "추운 겨울을 지나 피어나는 생명력을 획의 굵기 변화로 표현했습니다. 한지 위에서 멈추고 흐르는 먹의 농담은 우리 삶의 호흡과 닮아 있습니다.", img: "https://images.unsplash.com/photo-1512418490979-92798ccc9340?q=80&w=1200" },
  "2": { title: "Flowing Lines", artist: "Lee Calli", category: "English Calligraphy", year: "2023", tools: "Dip Pen, Walnut Ink, Rhodia Paper", desc: "서양 고전 서체의 우아함과 현대적 감각을 결합했습니다. 잉크의 번짐을 최소화하면서도 펜촉의 날카로운 끝을 살려 리듬감을 부여했습니다.", img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1200" },
  // ... 나머지도 동일한 형식으로 추가 가능
};

export default function WorkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const work = WORKS_DATA[params.id as string] || WORKS_DATA["1"]; // 기본값 설정

  return (
    <main className="bg-paper min-h-screen pb-32">
      {/* 상단 네비게이션 */}
      <nav className="p-8 flex justify-between items-center sticky top-0 z-50 bg-paper/80 backdrop-blur-sm">
        <button 
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-[10px] uppercase tracking-widest hover:opacity-50 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>
        <button className="hover:opacity-50 transition">
          <Share2 size={16} />
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {/* 1. 이미지 섹션 (감성 - Visual) */}
        <div className="relative overflow-hidden bg-zinc-100 aspect-[16/9]">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={work.img}
            className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
          />
        </div>

        {/* 2. 정보 섹션 (논리 - Info) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-serif mb-4">{work.title}</h1>
              <p className="text-sm text-ink/60 mb-8">{work.category}</p>
              
              <div className="space-y-6 pt-6 border-t border-ink/10">
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Artist</h5>
                  <p className="text-sm">{work.artist}</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Year</h5>
                  <p className="text-sm">{work.year}</p>
                </div>
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Tools</h5>
                  <p className="text-sm">{work.tools}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:pl-12"
            >
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-6 font-medium">Description</h3>
              <p className="text-xl font-light leading-relaxed text-ink/80 font-serif">
                {work.desc}
              </p>
              
              {/* 추가 접사 이미지 (질감을 보여주는 영역) */}
              <div className="mt-16 grid grid-cols-2 gap-4">
                <div className="aspect-square bg-zinc-100 overflow-hidden">
                  <img src={work.img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="detail 1" />
                </div>
                <div className="aspect-square bg-zinc-100 overflow-hidden">
                  <img src={work.img} className="w-full h-full object-cover scale-150 grayscale" alt="detail 2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}