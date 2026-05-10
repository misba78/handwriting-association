"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // 메타데이터로 이름 저장
      },
    });

    if (error) {
      alert("회원가입 실패: " + error.message);
    } else {
      alert("가입 확인 이메일을 보냈습니다. 이메일을 확인해 주세요!");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <button onClick={() => router.back()} className="mb-12 flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition">
          <ArrowLeft size={12} className="mr-2" /> Back
        </button>

        <h1 className="text-4xl font-serif italic mb-12 text-ink">Join Us.</h1>

        <form onSubmit={handleSignup} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-ink/40">Full Name</label>
            <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-transparent border-b border-ink/20 py-2 outline-none focus:border-ink transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-ink/40">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-ink/20 py-2 outline-none focus:border-ink transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-ink/40">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-ink/20 py-2 outline-none focus:border-ink transition-colors" />
          </div>

          <button disabled={loading} className="w-full bg-ink text-paper py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:opacity-90 transition disabled:opacity-30 flex items-center justify-center gap-2">
            {loading ? "Processing..." : <><UserPlus size={14} /> Create Account</>}
          </button>
        </form>
        
        <p className="mt-8 text-center text-[10px] text-ink/40 uppercase tracking-widest">
          Already have an account? <a href="/login" className="text-ink underline underline-offset-4">Login</a>
        </p>
      </motion.div>
    </main>
  );
}