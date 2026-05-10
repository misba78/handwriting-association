"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menuItems = [
    { name: "About", href: "/#about" },
    { name: "Works", href: "/#works" },
    { name: "Journal", href: "/#programs" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#2C2C2C] text-[#F9F8F5] flex flex-col justify-center items-center"
        >
          <button onClick={onClose} className="absolute top-10 right-10 p-2 hover:opacity-50 transition">
            <X size={32} strokeWidth={1} />
          </button>
          <nav className="flex flex-col items-center space-y-8">
            {menuItems.map((item, idx) => (
              <motion.a key={idx} href={item.href} onClick={onClose} className="text-4xl font-serif italic">{item.name}</motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}