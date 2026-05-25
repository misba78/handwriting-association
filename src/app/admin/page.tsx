"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, CheckCircle, Mail, Clock, User, 
  ChevronLeft, Plus, Calendar, Tag, Info, Image as ImageIcon,
  Star, StarOff, Upload, FileText, LayoutGrid
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  // ✅ 탭 종류 추가: notice, gallery
  const [tab, setTab] = useState<"inquiry" | "program" | "work" | "notice" | "gallery">("inquiry");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 데이터 상태들
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [works, setWorks] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);     // 새 데이터: 공지사항
  const [galleries, setGalleries] = useState<any[]>([]); // 새 데이터: 갤러리

  // 입력 폼 상태들
  const [newProgram, setNewProgram] = useState({ title: "", date: "", category: "", status: "모집중" });
  const [newWork, setNewWork] = useState({ title: "", artist: "", category: "", is_featured: false });
  const [file, setFile] = useState<File | null>(null);
  
  // 새 폼 상태: 공지사항 & 갤러리
  const [newNotice, setNewNotice] = useState({ title: "", category: "notice", content: "" });
  const [newGallery, setNewGallery] = useState({ title: "", category: "exhibition", description: "" });
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  // 1. 모든 데이터 불러오기 (notices, galleries 추가)
  const fetchData = async () => {
    setLoading(true);
    const { data: inq } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    const { data: prog } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
    const { data: wrk } = await supabase.from("works").select("*").order("created_at", { ascending: false });
    const { data: noti } = await supabase.from("notices").select("*").order("created_at", { ascending: false });
    const { data: gal } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });

    if (inq) setInquiries(inq);
    if (prog) setPrograms(prog);
    if (wrk) setWorks(wrk);
    if (noti) setNotices(noti);
    if (gal) setGalleries(gal);
    setLoading(false);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/login");
      else fetchData();
    };
    checkUser();
  }, [router]);

  // 공통 삭제 로직
  const deleteItem = async (table: string, id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) fetchData();
    else alert("삭제 실패: " + error.message);
  };

  // --- 기존 추가 로직들 ---
  const handleAddProgram = async (e: React.FormEvent) => { /* 기존 유지 */
    e.preventDefault();
    const { error } = await supabase.from("programs").insert([newProgram]);
    if (!error) {
      alert("등록 완료"); setNewProgram({ title: "", date: "", category: "", status: "모집중" }); fetchData();
    }
  };

  const handleWorkSubmit = async (e: React.FormEvent) => { /* 기존 유지 */
    e.preventDefault();
    if (!file) return alert("이미지를 선택해주세요.");
    setUploading(true);
    try {
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('works-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('works-images').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from("works").insert([{ ...newWork, img_url: publicUrl }]);
      if (dbError) throw dbError;
      alert("작품 등록 완료"); setFile(null); setNewWork({ title: "", artist: "", category: "", is_featured: false }); fetchData();
    } catch (error: any) { alert("오류: " + error.message); } finally { setUploading(false); }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => { /* 기존 유지 */
    await supabase.from("works").update({ is_featured: !currentStatus }).eq("id", id);
    fetchData();
  };

  // --- 새로운 추가 로직들 ---
  // A. 공지사항 추가
  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("notices").insert([newNotice]);
    if (!error) {
      alert("게시글이 등록되었습니다.");
      setNewNotice({ title: "", category: "notice", content: "" });
      fetchData();
    } else alert("등록 실패: " + error.message);
  };

  // B. 갤러리(전시/공모전) 추가
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile) return alert("포스터/사진을 선택해주세요.");
    setUploading(true);
    try {
      // 작품 이미지와 동일한 버킷(works-images)을 공용으로 사용
      const fileName = `gallery_${Math.random()}.${galleryFile.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('works-images').upload(fileName, galleryFile);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('works-images').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from("galleries").insert([{ ...newGallery, img_url: publicUrl }]);
      
      if (dbError) throw dbError;
      alert("갤러리 등록 완료");
      setGalleryFile(null); setNewGallery({ title: "", category: "exhibition", description: "" }); fetchData();
    } catch (error: any) { alert("오류: " + error.message); } finally { setUploading(false); }
  };

  // 탭 구성 설정
  const TABS = [
    { id: "inquiry", label: "Inquiries" },
    { id: "program", label: "Programs" },
    { id: "work", label: "Members Works" },
    { id: "notice", label: "Notice & Events" },
    { id: "gallery", label: "Gallery & Posters" }
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-[#2C2C2C] p-6 md:p-20">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <Link href="/" className="flex items-center text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition mb-4">
            <ChevronLeft size={12} className="mr-1" /> Back to Site
          </Link>
          <h1 className="text-4xl font-serif italic">Admin Dashboard</h1>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="flex flex-wrap gap-4 border-b border-black/5 pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`pb-2 text-[10px] uppercase tracking-widest transition ${
                tab === t.id ? "border-b border-black font-bold" : "opacity-30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="py-20 text-center opacity-20 animate-pulse">Loading...</div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* 기존 탭: 문의 관리 */}
            {tab === "inquiry" && (
              <motion.div key="inquiry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6">
                {inquiries.map((item) => (
                  <div key={item.id} className="bg-white border border-black/5 p-8 flex justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex gap-4 text-[9px] uppercase tracking-widest opacity-40">
                        <span>{item.name}</span><span>{item.email}</span><span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-lg font-serif">{item.message}</p>
                    </div>
                    <button onClick={() => deleteItem("inquiries", item.id)} className="text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 기존 탭: 강좌 관리 (생략하지 않음) */}
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
                        </div>
                      </div>
                      <button onClick={() => deleteItem("programs", item.id)} className="text-red-300 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 기존 탭: 내 작품 관리 */}
            {tab === "work" && (
              <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
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
                      <label htmlFor="is_featured" className="text-[10px] uppercase tracking-widest font-bold">대표작 설정</label>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="text-[10px] uppercase" />
                    <button type="submit" disabled={uploading} className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest font-bold disabled:opacity-30 flex items-center gap-2">
                      {uploading ? "Uploading..." : <><Upload size={14} /> Upload Work</>}
                    </button>
                  </div>
                </form>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {works.map((work) => (
                    <div key={work.id} className="group relative aspect-[4/5] bg-white border border-black/5 overflow-hidden">
                      <img src={work.img_url} className={`w-full h-full object-cover transition-all ${work.is_featured ? 'grayscale-0' : 'grayscale'}`} />
                      {work.is_featured && <div className="absolute top-3 left-3 bg-yellow-400 text-white text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Featured</div>}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                        <button onClick={() => toggleFeatured(work.id, work.is_featured)} className={`p-3 rounded-full transition-all ${work.is_featured ? 'bg-yellow-400 text-white' : 'bg-white text-black'}`}>
                          {work.is_featured ? <Star size={20} fill="currentColor" /> : <StarOff size={20} />}
                        </button>
                        <button onClick={() => deleteItem("works", work.id)} className="bg-white p-3 rounded-full text-red-500"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 🆕 새 탭: 공지사항 & 행사 관리 */}
            {tab === "notice" && (
              <motion.div key="notice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <form onSubmit={handleAddNotice} className="bg-white p-8 border border-black/5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">게시판 분류</label>
                      <select value={newNotice.category} onChange={e => setNewNotice({...newNotice, category: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none">
                        <option value="notice">공지사항</option>
                        <option value="event">주요행사</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">제목</label>
                      <input required value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="제목을 입력하세요" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">내용</label>
                    <textarea required rows={4} value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none resize-none" placeholder="내용을 입력하세요" />
                  </div>
                  <button type="submit" className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                    <FileText size={14} /> 글 등록하기
                  </button>
                </form>

                <div className="grid gap-4">
                  {notices.map((item) => (
                    <div key={item.id} className="bg-white border border-black/5 p-6 flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <span className={`text-[9px] uppercase tracking-widest px-2 py-1 ${item.category === 'notice' ? 'bg-black text-white' : 'bg-yellow-400 text-white'}`}>
                          {item.category === 'notice' ? '공지사항' : '주요행사'}
                        </span>
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <p className="text-sm opacity-60 line-clamp-2">{item.content}</p>
                        <p className="text-[9px] opacity-40">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => deleteItem("notices", item.id)} className="text-red-300 hover:text-red-500 shrink-0"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 🆕 새 탭: 전시 / 공모전 갤러리 관리 */}
            {tab === "gallery" && (
              <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <form onSubmit={handleAddGallery} className="bg-white p-8 border border-black/5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">갤러리 분류</label>
                      <select value={newGallery.category} onChange={e => setNewGallery({...newGallery, category: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none">
                        <option value="exhibition">전시 포스터</option>
                        <option value="contest">공모전 포스터</option>
                        <option value="normal">일반 갤러리 (행사/동아리)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest opacity-40">제목 / 포스터명</label>
                      <input required value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="예: 2024 정기 회원전" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest opacity-40">간단한 설명 (선택)</label>
                    <input value={newGallery.description} onChange={e => setNewGallery({...newGallery, description: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none" placeholder="장소, 일정 등의 정보" />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <input type="file" accept="image/*" onChange={e => setGalleryFile(e.target.files?.[0] || null)} className="text-[10px] uppercase" />
                    <button type="submit" disabled={uploading} className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest font-bold disabled:opacity-30 flex items-center gap-2">
                      {uploading ? "Uploading..." : <><ImageIcon size={14} /> Upload Poster</>}
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {galleries.map((item) => (
                    <div key={item.id} className="group relative aspect-[3/4] bg-white border border-black/5 overflow-hidden">
                      <img src={item.img_url} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-3 left-3 bg-white text-black text-[8px] px-2 py-1 font-bold uppercase tracking-tighter">
                        {item.category === 'exhibition' ? '전시' : item.category === 'contest' ? '공모전' : '갤러리'}
                      </div>
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4 text-center">
                        <h4 className="text-white font-serif">{item.title}</h4>
                        <p className="text-white/60 text-xs">{item.description}</p>
                        <button onClick={() => deleteItem("galleries", item.id)} className="mt-4 bg-white p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={16} />
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