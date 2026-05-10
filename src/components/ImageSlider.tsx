"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// 임시 활동 사진 데이터 (협회 워크숍, 서예 퍼포먼스 등)
const SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800" },
  { id: 2, img: "https://images.unsplash.com/photo-1518173835740-f5d1bd6d0c4a?q=80&w=800" },
  { id: 3, img: "https://images.unsplash.com/photo-1582201943021-e8e5b319d691?q=80&w=800" },
  { id: 4, img: "https://images.unsplash.com/photo-1569300305713-a4a3a9184566?q=80&w=800" },
  { id: 5, img: "https://images.unsplash.com/photo-1512418490979-92798ccc9340?q=80&w=800" },
];

export default function ImageSlider() {
  const carousel = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 슬라이더 전체 너비 계산 (드래그 제한용)
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="py-24 bg-paper/50">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
        <h3 className="text-3xl font-serif">Association Live</h3>
        <span className="text-[10px] uppercase tracking-widest text-ink/30 cursor-pointer">
          Drag to explore
        </span>
      </div>

      {/* 드래그 가능한 슬라이더 컨테이너 */}
      <motion.div ref={carousel} className="cursor-grab overflow-hidden" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-12 px-6 md:px-12" // 슬라이드 간 간격
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
          {SLIDES.map((slide) => (
            <motion.div 
              key={slide.id} 
              className="relative aspect-[4/5] h-[60vh] flex-none overflow-hidden bg-zinc-100"
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img 
                src={slide.img} 
                alt="Association activity"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 pointer-events-none" 
              />
              <div className="absolute top-4 left-4 text-[9px] font-mono text-ink/20 opacity-0 hover:opacity-100">
                #0{slide.id}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}