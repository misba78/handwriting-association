"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Supabase 회원가입 로직
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name, // 어드민 페이지에서 사용할 작가 이름 저장!
          },
        },
      });

      if (error) throw error;

      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (error: any) {
      alert("회원가입 실패: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* 뒤로 가기 링크 */}
        <Link 
          href="/login" 
          className="inline-flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-12"
        >
          <ChevronLeft size={12} className="mr-1" /> Back to Login
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-serif italic mb-2">Join us.</h1>
          <p className="text-[11px] uppercase tracking-widest opacity-40 mb-12">
            Become a member of the association
          </p>

          <form onSubmit={handleSignUp} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-40">Artist Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-black transition"
                placeholder="작가명 (예: 홍길동)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-40">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-black transition"
                placeholder="이메일"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest opacity-40">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-black transition"
                placeholder="비밀번호 (6자리 이상)"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest font-bold disabled:opacity-30 hover:bg-black/80 transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition border-b border-black/20 pb-1">
              Already have an account? Log in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}