"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("로그인 실패: " + error.message);
    } else {
      router.push("/admin"); // 로그인 성공 시 어드민으로 이동
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm">
        <h1 className="text-4xl font-serif italic mb-12 text-ink">Welcome Back.</h1>
        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-ink/40">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-ink/20 py-2 outline-none focus:border-ink transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-ink/40">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-ink/20 py-2 outline-none focus:border-ink transition-colors" />
          </div>
          <button className="w-full bg-ink text-paper py-4 text-[11px] uppercase tracking-[0.3em] font-bold">Login</button>
        </form>
      </motion.div>
    </main>
  );
}