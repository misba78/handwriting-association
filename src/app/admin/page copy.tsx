// src/app/admin/page.tsx (강좌 관리 기능 추가 버전)

"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { Plus, Trash2, Calendar, Tag, Info } from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = useState<"inquiry" | "program">("inquiry");
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  
  // 강좌 입력 폼 상태
  const [newProgram, setNewProgram] = useState({ title: "", date: "", category: "", status: "모집중" });

  const fetchData = async () => {
    const { data: inq } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    const { data: prog } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
    if (inq) setInquiries(inq);
    if (prog) setPrograms(prog);
  };

  useEffect(() => { fetchData(); }, []);

  // 강좌 추가 함수
  const addProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("programs").insert([newProgram]);
    if (!error) {
      alert("강좌가 등록되었습니다.");
      setNewProgram({ title: "", date: "", category: "", status: "모집중" });
      fetchData();
    }
  };

  // 강좌 삭제 함수
  const deleteProgram = async (id: string) => {
    if (!confirm("강좌를 삭제하시겠습니까?")) return;
    await supabase.from("programs").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] p-8 md:p-20 text-[#2C2C2C]">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-serif italic mb-8">Admin Dashboard</h1>
        
        {/* 탭 메뉴 */}
        <div className="flex space-x-8 border-b border-black/5">
          <button onClick={() => setTab("inquiry")} className={`pb-4 text-[11px] uppercase tracking-widest ${tab === 'inquiry' ? 'border-b border-black font-bold' : 'opacity-30'}`}>Inquiries</button>
          <button onClick={() => setTab("program")} className={`pb-4 text-[11px] uppercase tracking-widest ${tab === 'program' ? 'border-b border-black font-bold' : 'opacity-30'}`}>Programs</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {tab === "inquiry" ? (
          /* 기존 문의 리스트 (기존 코드와 동일) */
          <div>...Inquiry List...</div>
        ) : (
          /* 강좌 관리 섹션 */
          <div className="space-y-12">
            {/* 1. 신규 강좌 등록 폼 */}
            <form onSubmit={addProgram} className="bg-white p-8 border border-black/5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-40">Title</label>
                <input required value={newProgram.title} onChange={e => setNewProgram({...newProgram, title: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="강좌명" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-40">Date</label>
                <input required value={newProgram.date} onChange={e => setNewProgram({...newProgram, date: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="날짜 (ex: Every SAT)" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-40">Category</label>
                <input required value={newProgram.category} onChange={e => setNewProgram({...newProgram, category: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-2 outline-none focus:border-black" placeholder="카테고리" />
              </div>
              <button type="submit" className="bg-black text-white py-3 px-6 text-[10px] uppercase tracking-widest hover:opacity-80 transition">Add Program</button>
            </form>

            {/* 2. 강좌 목록 */}
            <div className="grid gap-4">
              {programs.map(prog => (
                <div key={prog.id} className="bg-white border border-black/5 p-6 flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-serif">{prog.title}</h4>
                    <div className="flex gap-6 mt-2 text-[10px] opacity-40 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {prog.date}</span>
                      <span className="flex items-center gap-1"><Tag size={12}/> {prog.category}</span>
                      <span className="flex items-center gap-1"><Info size={12}/> {prog.status}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteProgram(prog.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-full transition"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}