"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { ChevronLeft, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      // notices 테이블에서 'event'(주요행사) 카테고리만 가져옵니다.
      const { data } = await supabase
        .from("notices")
        .select("*")
        .eq("category", "event")
        .order("created_at", { ascending: false });

      if (data) setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">News & Events</p>
          <h1 className="text-4xl md:text-5xl font-serif italic">주요행사</h1>
        </div>

        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading events...</div>
        ) : events.length === 0 ? (
          <p className="text-sm italic opacity-40 py-12 border-t border-black/10">등록된 주요 행사가 없습니다.</p>
        ) : (
          <div className="border-t border-black/10">
            {events.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-black/5 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-start group"
              >
                {/* 행사 아이콘 & 날짜 */}
                <div className="text-[11px] opacity-50 flex items-center gap-2 font-mono pt-1">
                  <Sparkles size={12} className="text-yellow-500 animate-pulse" />
                  <span className="font-bold flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {/* 제목 및 세부내용 */}
                <div className="md:col-span-3 space-y-3">
                  <h3 className="text-2xl font-serif tracking-tight group-hover:text-black/50 transition-colors">
                    {item.title}
                  </h3>
                  <div className="w-4 h-[1px] bg-black/10"></div>
                  <p className="text-sm text-black/60 leading-relaxed whitespace-pre-wrap max-w-2xl">
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