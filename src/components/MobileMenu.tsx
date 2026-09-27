"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";

// layout.tsx와 동일한 9개 메뉴 데이터
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // 어떤 카테고리가 열려있는지 저장하는 상태 (아코디언 기능)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    if (expandedCategory === name) {
      setExpandedCategory(null); // 이미 열려있으면 닫기
    } else {
      setExpandedCategory(name); // 아니면 해당 카테고리 열기
    }
  };

  // 메뉴를 닫을 때 아코디언 상태도 초기화
  const handleClose = () => {
    setExpandedCategory(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#1a1a1a] text-white flex flex-col overflow-y-auto"
        >
          {/* 상단 닫기 버튼 영역 */}
          <div className="p-6 md:p-10 flex justify-between items-center shrink-0 sticky top-0 bg-[#1a1a1a] z-10">
            <span className="font-bold tracking-tighter text-lg">H.ASSOC</span>
            <button onClick={handleClose} className="hover:rotate-90 transition-transform duration-300">
              <X size={32} />
            </button>
          </div>

          {/* 스크롤 가능한 메뉴 리스트 */}
          <nav className="flex-1 px-6 md:px-10 pb-20">
            <div className="max-w-2xl mx-auto flex flex-col gap-2">
              {NAV_MENUS.map((menu) => (
                <div key={menu.name} className="border-b border-white/10 last:border-0">
                  {/* 대분류 버튼 */}
                  <button
                    onClick={() => toggleCategory(menu.name)}
                    className="w-full flex justify-between items-center py-6 text-2xl md:text-4xl font-serif text-left hover:text-white/70 transition-colors"
                  >
                    {menu.name}
                    <motion.div
                      animate={{ rotate: expandedCategory === menu.name ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="opacity-50" />
                    </motion.div>
                  </button>

                  {/* 하위 메뉴 아코디언 영역 */}
                  <AnimatePresence>
                    {expandedCategory === menu.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 flex flex-col gap-4 pl-4">
                          {menu.sub.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={handleClose}
                              className="text-sm md:text-base text-white/50 hover:text-white transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}