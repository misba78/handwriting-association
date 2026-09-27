"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function InquiryPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // inquiries 테이블에 데이터 삽입
    const { error } = await supabase
      .from("inquiries")
      .insert([formData]);

    if (error) {
      alert("전송에 실패했습니다: " + error.message);
    } else {
      alert("문의가 성공적으로 접수되었습니다. 관리자가 확인 후 연락드리겠습니다.");
      setFormData({ name: "", email: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        
        {/* 상단 네비게이션 */}
        <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-16">
          <ChevronLeft size={12} className="mr-1" /> Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-widest opacity-40 mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-serif italic mb-6">문의하기</h1>
          <p className="text-sm md:text-base text-black/60 leading-relaxed">
            협회 가입, 전시회 문의, 교육 과정 등 궁금한 점을 남겨주시면 <br className="hidden md:block" />
            빠른 시일 내에 답변해 드리겠습니다.
          </p>
        </motion.div>

        {/* 문의 폼 영역 */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          onSubmit={handleSubmit} 
          className="space-y-10 border-t border-black/10 pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest opacity-40">Name</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-colors"
                placeholder="성함을 입력해주세요"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest opacity-40">Email</label>
              <input 
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-colors"
                placeholder="회신받으실 이메일을 입력해주세요"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest opacity-40">Message</label>
            <textarea 
              required
              rows={6}
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="w-full bg-transparent border-b border-black/20 py-3 outline-none focus:border-black transition-colors resize-none"
              placeholder="문의하실 내용을 상세히 적어주세요"
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="group flex items-center gap-3 bg-black text-white px-10 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black/80 transition-colors disabled:opacity-40"
          >
            {loading ? "전송 중..." : "Send Message"}
            {!loading && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </motion.form>

      </div>
    </div>
  );
}