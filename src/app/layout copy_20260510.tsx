"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { supabase } from "../lib/supabase"; // Supabase 클라이언트 경로 확인
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CustomCursor from "../components/CustomCursor"; 
import SmoothScroll from "../components/SmoothScroll";
import MobileMenu from "../components/MobileMenu";
import Preloader from "../components/Preloader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 1. 로그인 상태 실시간 감지
  useEffect(() => {
    // 초기 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 인증 상태 변화 구독 (로그인/로그아웃 시 자동 업데이트)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. 로그아웃 핸들러
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <html lang="ko">
      <head>
        <title>손글씨 협회 | Handwriting Association</title>
      </head>
      <body className="bg-[#F9F8F5] antialiased">
        {/* 커스텀 커서 */}
        <CustomCursor />
        
        {/* 부드러운 스크롤 컨테이너 */}
        <SmoothScroll>
          {/* 프리로더 */}
          <Preloader />

          {/* 모바일 메뉴 */}
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          {/* 고정 헤더: mix-blend-difference를 유지하여 우아한 색상 반전 적용 */}
          <header className="fixed top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
            <Link href="/" className="font-bold tracking-tighter text-lg cursor-pointer">
              H.ASSOC
            </Link>
            
            {/* 데스크탑 메뉴 */}
            <nav className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-medium">
              <Link href="/#about" className="hover:opacity-50 transition">About</Link>
              <Link href="/works" className="hover:opacity-50 transition">Works</Link>
              <Link href="/#programs" className="hover:opacity-50 transition">Journal</Link>
              <Link href="/#contact" className="hover:opacity-50 transition">Contact</Link>
              
              {/* 인증 상태에 따른 동적 메뉴 */}
              <AnimatePresence mode="wait">
                {user ? (
                  <motion.div
                    key="auth-logged-in"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center space-x-10"
                  >
                    <Link href="/admin" className="text-white/60 hover:text-white transition">Admin</Link>
                    <button 
                      onClick={handleLogout}
                      className="group relative overflow-hidden pb-1"
                    >
                      <span className="relative z-10 font-bold">Logout</span>
                      {/* 우아한 밑줄 애니메이션 */}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="auth-logged-out"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <Link href="/login" className="text-white/60 hover:text-white transition font-bold">Login</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="md:hidden text-[11px] uppercase tracking-[0.3em] font-medium border-b border-white/40 pb-1"
            >
              Menu
            </button>
          </header>

          {/* 페이지 콘텐츠 */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}