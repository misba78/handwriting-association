"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. 인증 상태 변화 감지 (로그인/로그아웃 시 실시간 반영)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // 로그아웃 후 메인으로 이동
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
      {/* 로고: 왼쪽 */}
      <Link href="/" className="pointer-events-auto">
        <span className="text-paper font-bold tracking-tighter text-xl">H.ASSOC</span>
      </Link>

      {/* 우측 메뉴: 우아한 로그아웃/로그인 버튼 */}
      <div className="flex items-center space-x-8 pointer-events-auto">
        <Link href="/works" className="text-paper/40 hover:text-paper text-[10px] uppercase tracking-[0.3em] transition-colors">
          Archive
        </Link>
        
        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="logged-in"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center space-x-6"
            >
              <Link href="/admin" className="text-paper/40 hover:text-paper text-[10px] uppercase tracking-[0.3em] transition-colors">
                Admin
              </Link>
              <button 
                onClick={handleLogout}
                className="group relative overflow-hidden px-4 py-2"
              >
                <span className="relative z-10 text-paper text-[10px] uppercase tracking-[0.3em] font-bold">Logout</span>
                {/* 호버 시 밑줄 애니메이션 */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-paper transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="logged-out"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <Link href="/login" className="text-paper/40 hover:text-paper text-[10px] uppercase tracking-[0.3em] transition-colors">
                Member Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}