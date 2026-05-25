"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"; // 상대 경로 유지
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, CheckCircle, Mail, Clock, User, 
  ChevronLeft, Plus, Calendar, Tag, Info, Image as ImageIcon,
  Star, StarOff, Upload
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  
  const [tab, setTab] = useState<"inquiry" | "program" | "work">("inquiry");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("works");
  // 데이터 상태들
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);

  // 입력 폼 상태들
  const [newProgram, setNewProgram] = useState({ title: "", date: "", category: "", status: "모집중" });
  const [newWork, setNewWork] = useState({ title: "", artist: "", category: "", is_featured: false });
  const [file, setFile] = useState<File | null>(null);

  // 1. 모든 데이터 불러오기
  const fetchData = async () => {
    setLoading(true);
    const { data: inq } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    const { data: prog } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
    const { data: wrk } = await supabase.from("works").select("*").order("created_at", { ascending: false });

    if (inq) setInquiries(inq);
    if (prog) setPrograms(prog);
    if (wrk) setWorks(wrk);
    setLoading(false);
  };





  
  useEffect(() => {
    const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login"); // 로그인 안 되어 있으면 로그인 페이지로 추방(?)
    } else {
      fetchData(); // 로그인 되어 있으면 데이터 로드
    }
  };
    checkUser();
    fetchData();
  }, []);

  // 2. 강좌 추가 로직
  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("programs").insert([newProgram]);
    if (!error) {
      alert("새 강좌가 등록되었습니다.");
      setNewProgram({ title: "", date: "", category: "", status: "모집중" });
      fetchData();
    } else {
      alert("등록 실패: " + error.message);
    }
  };

  // 3. 작품 업로드 로직 (이미지 포함)
  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("이미지 파일을 선택해주세요.");
    
    setUploading(true);
    try {
      // (1) 이미지 스토리지 업로드
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('works-images')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // (2) 이미지 공개 URL 가져오기
      const { data: { publicUrl } } = supabase.storage
        .from('works-images')
        .getPublicUrl(fileName);

      // (3) DB에 정보 저장 (is_featured 포함)
      const { error: dbError } = await supabase.from("works").insert([
        { ...newWork, img_url: publicUrl }
      ]);

      if (dbError) throw dbError;

      alert("작품이 성공적으로 등록되었습니다.");
      setFile(null);
      setNewWork({ title: "", artist: "", category: "", is_featured: false });
      fetchData();
    } catch (error: any) {
      alert("오류 발생: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // 4. 대표작 토글 로직
  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("works")
      .update({ is_featured: !currentStatus })
      .eq("id", id);
    
    if (!error) {
      fetchData();
    } else {
      alert("상태 변경 실패: " + error.message);
    }
  };

  // 5. 삭제 로직
  const deleteItem = async (table: string, id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) fetchData();
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] p-6 md:p-20">
      {/* 상단 헤더 */}
      <div className="max-w-6xl mx-auto mb-16 flex justify-between items-end">
        <div>
          <Link href="/" className="flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-4">
            <ChevronLeft size={12} className="mr-1" /> Back to Site
          </Link>
          <h1 className="text-4xl font-serif italic">Admin Dashboard</h1>
        </div>
        
        <div className="flex space-x-6 border-b border-black/5">
          {["inquiry", "program", "work"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`pb-2 text-[10px] uppercase tracking-widest transition ${
                tab === t ? "border-b border-black font-bold" : "opacity-30"
              }`}
            >
              {t}s
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading...</div>
        ) : (
          <AnimatePresence mode="wait">
            {/* --- 탭 1: 문의 관리 --- */}
            {tab === "inquiry" && (
              <motion.div key="inquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6">
                {inquiries.map((item) => (
                  <div key={item.id} className="bg-white border border-black/5 p-8 flex justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex gap-4 text-[9px] uppercase tracking-widest opacity-40">
                        <span>{item.name}</span>
                        <span>{item.email}</span>
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-lg font-serif">{item.message}</p>
                    </div>
                    <button onClick={() => deleteItem("inquiries", item.id)} className="text-red-300 hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* --- 탭 2: 강좌 관리 --- */}
            {tab === "program" && (
              <motion.div key="program" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <form onSubmit={handleAddProgram} className="bg-white p-8 border border-black/5 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Title</label>
                    <input required value={newProgram.title} onChange={e => setNewProgram({...newProgram, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="강좌명" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Date</label>
                    <input required value={newProgram.date} onChange={e => setNewProgram({...newProgram, date: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="날짜" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">Category</label>
                    <input required value={newProgram.category} onChange={e => setNewProgram({...newProgram, category: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="카테고리" />
                  </div>
                  <button type="submit" className="bg-black text-white py-3 text-[10px] uppercase tracking-widest font-bold">Add Program</button>
                </form>

                <div className="grid gap-4">
                  {programs.map((item) => (
                    <div key={item.id} className="bg-white border border-black/5 p-6 flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-serif">{item.title}</h4>
                        <div className="flex gap-4 mt-2 text-[9px] uppercase tracking-widest opacity-40">
                          <span className="flex items-center gap-1"><Calendar size={12}/> {item.date}</span>
                          <span className="flex items-center gap-1"><Tag size={12}/> {item.category}</span>
                          <span className="flex items-center gap-1"><Info size={12}/> {item.status}</span>
                        </div>
                      </div>
                      <button onClick={() => deleteItem("programs", item.id)} className="text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- 탭 3: 작품 관리 (기능 추가됨) --- */}
            {tab === "work" && (
              <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                {/* 작품 업로드 폼 */}
                <form onSubmit={handleWorkSubmit} className="bg-white p-8 border border-black/5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">Work Title</label>
                      <input required value={newWork.title} onChange={e => setNewWork({...newWork, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="작품명" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">Artist Name</label>
                      <input required value={newWork.artist} onChange={e => setNewWork({...newWork, artist: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="작가명" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">Category</label>
                      <input required value={newWork.category} onChange={e => setNewWork({...newWork, category: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="예: 한글 서예" />
                    </div>
                    <div className="flex items-center space-x-3 h-10">
                      <input type="checkbox" id="is_featured" checked={newWork.is_featured} onChange={e => setNewWork({...newWork, is_featured: e.target.checked})} className="w-4 h-4" />
                      <label htmlFor="is_featured" className="text-[10px] uppercase tracking-widest font-bold">대표작으로 설정</label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="text-[10px] uppercase" />
                    <button type="submit" disabled={uploading} className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest font-bold disabled:opacity-30 flex items-center gap-2">
                      {uploading ? "Uploading..." : <><Upload size={14} /> Upload Work</>}
                    </button>
                  </div>
                </form>

                {/* 작품 목록 그리드 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {works.map((work) => (
                    <div key={work.id} className="group relative aspect-[4/5] bg-white border border-black/5 overflow-hidden">
                      <img src={work.img_url} className={`w-full h-full object-cover transition-all ${work.is_featured ? 'grayscale-0' : 'grayscale'}`} />
                      
                      {/* 대표작 뱃지 */}
                      {work.is_featured && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-white text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Featured</div>
                      )}

                      {/* 호버 제어 레이어 */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                        <button 
                          onClick={() => toggleFeatured(work.id, work.is_featured)}
                          className={`p-3 rounded-full transition-all ${work.is_featured ? 'bg-yellow-400 text-white' : 'bg-white text-black hover:bg-yellow-400 hover:text-white'}`}
                        >
                          {work.is_featured ? <Star size={20} fill="currentColor" /> : <StarOff size={20} />}
                        </button>
                        <button onClick={() => deleteItem("works", work.id)} className="bg-white p-3 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}