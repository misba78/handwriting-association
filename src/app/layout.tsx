"use client";

import { useEffect, useState } from "react";
import "./globals.css";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CustomCursor from "../components/CustomCursor";
import SmoothScroll from "../components/SmoothScroll";
import MobileMenu from "../components/MobileMenu";
import Preloader from "../components/Preloader";

// ✅ 9개의 대메뉴와 하위 메뉴 데이터를 배열로 정리 (유지보수가 훨씬 쉬워집니다)
const NAV_MENUS = [
  {
    name: "협회소개", href: "/about",
    sub: [{ name: "인사말", href: "/about/greeting" }, { name: "설립목적", href: "/about/purpose" }, { name: "연혁", href: "/about/history" }, { name: "조직도", href: "/about/organization" }, { name: "총회명단", href: "/about/members" }]
  },
  {
    name: "협회활동", href: "/activities",
    sub: [{ name: "전시", href: "/activities/exhibitions" }, { name: "공모전", href: "/activities/contests" }, { name: "교육/세미나", href: "/activities/seminars" }]
  },
  {
    name: "센터/동아리", href: "/centers",
    sub: [{ name: "센터 소개", href: "/centers/info" }, { name: "동아리 소개", href: "/centers/clubs" }, { name: "갤러리", href: "/centers/gallery" }]
  },
  {
    name: "자격검정", href: "/certification",
    sub: [{ name: "자격증 안내", href: "/certification/info" }, { name: "응시자격", href: "/certification/eligibility" }, { name: "전형방법", href: "/certification/method" }, { name: "시험일정", href: "/certification/schedule" }]
  },
  {
    name: "이산글씨학교", href: "/school",
    sub: [{ name: "교육기관", href: "/school/institutes" }, { name: "수강신청", href: "/school/apply" }, { name: "특강", href: "/school/special" }, { name: "자료실", href: "/school/resources" }]
  },
  {
    name: "이산글씨연구소", href: "/lab",
    sub: [{ name: "연구소 안내", href: "/lab/info" }, { name: "자료실", href: "/lab/resources" }]
  },
  {
    name: "협회소식", href: "/news",
    sub: [{ name: "공지사항", href: "/news/notices" }, { name: "주요행사", href: "/news/events" }, { name: "갤러리", href: "/news/gallery" }]
  },
  {
    name: "협력기관", href: "/partners",
    sub: [{ name: "협력기관소개", href: "/partners/info" }, { name: "행사내용", href: "/partners/events" }]
  },
  {
    name: "안내/문의", href: "/contact",
    sub: [{ name: "전시/공모전 일정", href: "/contact/schedule" }, { name: "회원가입/회비", href: "/contact/membership" }, { name: "문의하기", href: "/contact/inquiry" }]
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        <CustomCursor />
        <SmoothScroll>
          <Preloader />
          {/* 모바일 메뉴 컴포넌트도 나중에 업데이트 해야 합니다 */}
          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          {/* ✅ 대규모 메뉴를 수용하도록 헤더 구조 변경 */}
          <header className="fixed top-0 w-full z-50 p-6 md:px-10 flex justify-between items-center mix-blend-difference text-white">
            
            {/* 로고 영역 */}
            <Link href="/" className="font-bold tracking-tighter text-lg cursor-pointer z-50 shrink-0">
              H.ASSOC
            </Link>
            
            {/* 데스크탑 메뉴 영역 (화면이 넓을 때만 표시) */}
            <nav className="hidden xl:flex items-center space-x-6 text-[12px] font-medium tracking-wide w-full justify-center">
              {NAV_MENUS.map((menu) => (
                <div key={menu.name} className="relative group py-4 px-2">
                  {/* 메인 메뉴 */}
                  <Link href={menu.href} className="hover:opacity-50 transition cursor-pointer">
                    {menu.name}
                  </Link>
                  
                  {/* 드롭다운 하위 메뉴 */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                    <div className="bg-black/90 backdrop-blur-md text-white px-6 py-4 flex flex-col gap-4 min-w-[140px] text-center border border-white/10 rounded-sm">
                      {menu.sub.map((subItem) => (
                        <Link key={subItem.name} href={subItem.href} className="text-[11px] text-white/70 hover:text-white whitespace-nowrap transition-colors">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* 로그인/어드민 영역 */}
            <div className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-widest font-medium shrink-0">
              <AnimatePresence mode="wait">
                {user ? (
                  <motion.div key="auth-logged-in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-6">
                    <Link href="/admin" className="text-white/60 hover:text-white transition">Admin</Link>
                    <button onClick={handleLogout} className="group relative overflow-hidden pb-1">
                      <span className="relative z-10 font-bold">Logout</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="auth-logged-out">
                    <Link href="/login" className="text-white/60 hover:text-white transition font-bold">Login</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 모바일/태블릿용 메뉴 버튼 */}
            <button onClick={() => setIsMenuOpen(true)} className="xl:hidden text-[11px] uppercase tracking-[0.3em] font-medium border-b border-white/40 pb-1 z-50">
              Menu
            </button>
          </header>

          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}