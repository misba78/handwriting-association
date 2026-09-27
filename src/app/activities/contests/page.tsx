"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ContestsPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      // galleries 테이블에서 'contest'(공모전 포스터) 카테고리만 쏙 골라옵니다.
      const { data } = await supabase
        .from("galleries")
        .select("*")
        .eq("category", "contest")
        .order("created_at", { ascending: false });

      if (data) setContests(data);
      setLoading(false);
    };

    fetchContests();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Activities</p>
          <h1 className="text-4xl md:text-5xl font-serif italic">Contests</h1>
        </div>

        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading contests...</div>
        ) : contests.length === 0 ? (
          <p className="text-sm italic opacity-40 py-12 border-t border-black/10">등록된 공모전 정보가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 border-t border-black/10 pt-12">
            {contests.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col space-y-4 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden border border-black/5">
                  <img 
                    src={item.img_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-black/50 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}