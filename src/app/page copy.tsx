"use client";


import { useEffect, useState } from "react"; // 상태 관리를 위해 추가
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Send, 
  Instagram, 
  Linkedin, 
  Twitter 
} from "lucide-react"; 
import Link from "next/link";
import TextReveal from "../components/TextReveal";
import ImageSlider from "../components/ImageSlider";
import { supabase } from "../lib/supabase"; // Supabase 클라이언트 불러오기

const WORKS = [
  { id: 1, title: "봄의 숨결", artist: "김서예", category: "한글 서예", img: "https://images.unsplash.com/photo-1512418490979-92798ccc9340?q=80&w=800" },
  { id: 2, title: "Flowing Lines", artist: "Lee Calli", category: "English Calligraphy", img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=800" },
  { id: 3, title: "정갈한 마음", artist: "박진심", category: "펜글씨", img: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800" },
  { id: 4, title: "Ink & Spirit", artist: "Choi Art", category: "Modern Art", img: "https://images.unsplash.com/photo-1455391244783-d9574734383e?q=80&w=800" },
];

const PROGRAMS = [
  { id: 1, title: "기초 정자체 클래스", date: "Every SAT", category: "Education", status: "모집중" },
  { id: 2, title: "현대 캘리그라피 워크숍", date: "2026.05.12", category: "Workshop", status: "마감" },
  { id: 3, title: "잉크와 종이의 상관관계", date: "Journal", category: "Archive", status: "Read" },
];

export default function Home() {
const [programs, setPrograms] = useState<any[]>([]); // 강좌 상태 추가
  // ... 기존 loading, submitted 상태

  // 강좌 데이터 불러오기 함수
  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setPrograms(data);
  };

  useEffect(() => {
    fetchPrograms(); // 페이지 로드 시 실행
  }, []);


  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 문의 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Supabase 'inquiries' 테이블에 데이터 삽입
    const { error } = await supabase.from("inquiries").insert([data]);

    setLoading(false);

    if (!error) {
      setSubmitted(true);
      (e.target as HTMLFormElement).reset(); // 폼 초기화
    } else {
      alert("전송 중 오류가 발생했습니다: " + error.message);
    }
  };

  return (
    <main className="relative w-full">
      
      {/* 1. Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-paper">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
            <source src="/hero-writing.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 text-center px-4">
          <TextReveal 
            text="마음이 머무는 획," 
            className="text-4xl md:text-7xl font-serif tracking-tight text-ink mb-4"
          />
          <TextReveal 
            text="손으로 쓰는 진심" 
            className="text-4xl md:text-7xl font-serif italic font-light opacity-80 underline decoration-1 underline-offset-[12px] text-ink"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 text-[10px] md:text-xs uppercase tracking-[0.4em] text-ink/60"
          >
            Handwriting Association — Art & Logic
          </motion.p>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="min-h-[70vh] flex flex-col items-center justify-center bg-paper px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl text-center"
        >
          <span className="text-[10px] uppercase tracking-widest text-ink/40 mb-10 block">Our Philosophy</span>
          <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-ink/90 font-serif">
            디지털의 빠름 속에서 잃어버린 <br />
            <span className="italic">기다림의 미학</span>을 다시 세웁니다.
          </h2>
          <div className="mt-16 w-px h-24 bg-ink/20 mx-auto" />
        </motion.div>
      </section>

      {/* 3. Works Section */}
      <section id="works" className="bg-paper px-6 md:px-12 pb-40">
        <div className="flex justify-between items-end mb-20 max-w-7xl mx-auto">
          <h3 className="text-4xl font-serif">Selected Works</h3>
          <span className="text-[11px] uppercase tracking-widest text-ink/40 border-b border-ink/20 pb-1 cursor-pointer">View All Collection</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 max-w-7xl mx-auto">
          {WORKS.map((work, idx) => (
            <Link href={`/works/${work.id}`} key={work.id}>
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                viewport={{ once: true }}
                className={`group cursor-pointer ${idx % 2 === 1 ? 'md:mt-48' : ''}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  <img src={work.img} alt={work.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105" />
                </div>
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-serif group-hover:italic transition-all">{work.title}</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 mt-1">{work.artist}</p>
                  </div>
                  <ArrowUpRight className="text-ink/20 group-hover:text-ink transition-colors" size={20} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

     {/* 4. Journal/Programs Section (DB 연동 버전) */}
  <section id="programs" className="bg-paper px-6 md:px-12 py-40 border-t border-ink/5">
    <div className="max-w-7xl mx-auto">
      <h3 className="text-4xl font-serif italic mb-20">Programs</h3>
      <div className="border-b border-ink/10">
        {programs.map((item, idx) => (
          <motion.div key={item.id} whileHover={{ x: 20 }} className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-t border-ink/10 cursor-pointer transition-all">
            <div className="flex items-center space-x-8">
              <span className="text-[10px] font-mono opacity-30">0{idx + 1}</span>
              <h4 className="text-2xl font-light">{item.title}</h4>
            </div>
            <div className="flex items-center space-x-12 mt-4 md:mt-0">
              <span className="text-xs opacity-60 font-light">{item.date}</span>
              <span className={`text-[9px] px-3 py-1 border rounded-full uppercase ${
                item.status === '모집중' ? 'border-ink text-ink' : 'border-ink/10 text-ink/30'
              }`}>
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

      {/* 5. Contact Form Section (연동 로직 추가 버전) */}
      <section id="contact" className="bg-paper px-6 md:px-12 py-40 border-t border-ink/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-ink/50 mb-8 block font-semibold">
              Inquiry
            </span>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight text-ink">
              당신의 획을 <br />우리와 공유하세요.
            </h3>
            <p className="mt-8 text-sm text-ink/60 font-light leading-relaxed max-w-xs">
              프로젝트 문의, 협업 제안, 혹은 단순한 인사를 기다립니다. 
              모든 메시지는 소중히 읽고 답변 드립니다.
            </p>
          </div>
          
          <div className="relative">
            {submitted ? (
              // 전송 완료 시 나타나는 메시지
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="h-full flex flex-col items-center justify-center text-center p-10 border border-ink/10"
              >
                <h4 className="text-2xl font-serif italic mb-4">전달되었습니다.</h4>
                <p className="text-sm text-ink/50 mb-8 leading-relaxed">
                  남겨주신 소중한 메시지를 확인한 후 <br /> 빠른 시일 내에 답변드리겠습니다.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] uppercase tracking-widest underline underline-offset-4 opacity-40 hover:opacity-100 transition"
                >
                  새로운 메시지 보내기
                </button>
              </motion.div>
            ) : (
              // 실제 입력 폼
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-widest text-ink/40 block mb-2">Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="성함을 입력해주세요" 
                    className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-ink transition-colors placeholder:text-ink/40 text-ink font-normal" 
                  />
                </div>
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-widest text-ink/40 block mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="example@email.com" 
                    className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-ink transition-colors placeholder:text-ink/40 text-ink font-normal" 
                  />
                </div>
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-widest text-ink/40 block mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    placeholder="프로젝트나 협업에 대해 자유롭게 적어주세요" 
                    rows={4} 
                    className="w-full bg-transparent border-b border-ink/20 py-3 outline-none focus:border-ink transition-colors placeholder:text-ink/40 text-ink font-normal resize-none" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-6 text-[11px] uppercase tracking-[0.3em] font-bold group pt-4 disabled:opacity-30"
                >
                  <span className="group-hover:mr-2 transition-all duration-300 text-ink">
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-all duration-300">
                    <Send size={16} />
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 신규: 이미지 슬라이더 섹션 */}
      <ImageSlider />

      {/* 6. Footer */}
      <footer className="bg-ink text-paper py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left items-center">
          
          <div className="md:col-span-1 text-[9px] uppercase tracking-[0.4em] opacity-30 order-3 md:order-1">
            © 2026 Handwriting Association. <br className="hidden md:block" /> All Rights Reserved.
          </div>

          <div className="md:col-span-1 font-bold tracking-tighter text-3xl order-1 md:order-2 text-center">
            H.ASSOC
          </div>

          <div className="md:col-span-1 flex justify-center md:justify-end space-x-10 order-2 md:order-3">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map((social, idx) => (
              <motion.a 
                key={idx} 
                href={social.href} 
                className="group p-2 relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="absolute inset-0 bg-paper rounded-full opacity-0 group-hover:opacity-10 scale-0 group-hover:scale-100 transition-all duration-500" />
                <social.Icon 
                  size={18} 
                  className="text-paper opacity-30 group-hover:opacity-100 transition-opacity" 
                  strokeWidth={1.5} 
                />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}