"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase"; // 상대 경로 확인
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      // notices 테이블에서 'notice'(공지사항) 카테고리만 가져옵니다.
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .eq("category", "notice")
        .order("created_at", { ascending: false });

      if (data) setNotices(data);
      setLoading(false);
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* 네비게이션 상단 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Notice</p>
          <h1 className="text-4xl md:text-5xl font-serif italic">협회소식</h1>
        </div>

        {/* 리스트 영역 */}
        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading notices...</div>
        ) : notices.length === 0 ? (
          <p className="text-sm italic opacity-40 py-12 border-t border-black/10">등록된 공지사항이 없습니다.</p>
        ) : (
          <div className="border-t border-black/10">
            {notices.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-black/5 py-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-start group"
              >
                {/* 날짜 */}
                <div className="text-[11px] opacity-40 flex items-center gap-1 font-mono pt-1">
                  <Calendar size={12} />
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                
                {/* 제목 및 내용 */}
                <div className="md:col-span-3 space-y-2">
                  <h3 className="text-xl font-medium tracking-tight group-hover:opacity-60 transition-opacity">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black/60 leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}