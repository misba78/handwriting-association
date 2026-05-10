"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 0에서 100까지 숫자가 올라가는 로직
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500); // 100 달성 후 0.5초 뒤 종료
          return 100;
        }
        return prev + 1;
      });
    }, 20); // 숫자가 올라가는 속도 조절

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999] bg-ink text-paper flex flex-col items-center justify-center"
        >
          {/* 중앙 로고 혹은 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-[10px] uppercase tracking-[0.6em] mb-4 opacity-40">Handwriting Association</h2>
            <div className="text-6xl md:text-8xl font-serif italic mb-8">{percent}%</div>
          </motion.div>

          {/* 하단 진행 바 */}
          <div className="absolute bottom-20 w-48 h-[1px] bg-paper/10">
            <motion.div 
              className="h-full bg-paper"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}