// src/components/Tutorial/TutorialScreen.jsx
import React, { useState } from 'react';
import { tutorialData } from '../../data/tutorialData';

const TutorialScreen = ({ onBack }) => {
  // Mặc định chọn tab đầu tiên (motion)
  const [activeTab, setActiveTab] = useState('motion');

  // Tìm data của tab đang chọn
  const currentCategory = tutorialData.find(cat => cat.id === activeTab);

  return (
    <div className="relative flex h-screen p-6 pt-20 overflow-hidden font-sans bg-slate-900">
      
      {/* 1. NỀN (Giống GameScreen) */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{ 
            backgroundImage: "url('/assets/images/bg-stage1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)', // Làm mờ để nổi bật nội dung
            imageRendering: 'pixelated'
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-black/50"></div>

      {/* --- NÚT QUAY LẠI --- */}
      <button 
        onClick={onBack}
        className="absolute z-50 flex items-center justify-center w-12 h-12 text-white transition-all bg-red-500 border-2 border-red-600 shadow-lg top-6 left-6 rounded-xl hover:bg-red-400 hover:scale-110 active:scale-95"
        title="Quay lại Menu"
      >
        <span className="text-2xl">🏠</span>
      </button>

      {/* --- SỔ TAY BÍ KÍP (Container Chính) --- */}
      <div className="relative z-10 flex w-full max-w-6xl mx-auto overflow-hidden bg-white border-8 shadow-2xl h-5/6 rounded-3xl border-slate-800">
        
        {/* CỘT TRÁI: DANH MỤC (Tabs) */}
        <div className="flex flex-col w-1/4 h-full border-r-4 bg-slate-100 border-slate-300">
            <div className="p-6 pb-4 bg-white border-b-2 border-slate-200">
                <h1 className="flex items-center gap-2 text-2xl font-black tracking-widest uppercase text-slate-800">
                    <span>📚</span> Bí Kíp
                </h1>
                <p className="mt-1 ml-1 text-xs font-bold text-slate-500">Từ điển khối lệnh</p>
            </div>
            
            <div className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
                {tutorialData.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`
                            w-full p-4 rounded-xl flex items-center gap-3 font-bold text-left transition-all border-2
                            ${activeTab === cat.id 
                                ? `${cat.color} text-white border-black shadow-md scale-105 translate-x-1` 
                                : 'bg-white border-transparent text-slate-500 hover:bg-slate-200'}
                        `}
                    >
                        <span className="text-2xl drop-shadow-sm">{cat.icon}</span>
                        <span className="text-xs tracking-wide uppercase md:text-sm">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* CỘT PHẢI: NỘI DUNG CHI TIẾT */}
        <div className="relative flex flex-col flex-1 h-full bg-white">
            
            {/* Header Cột Phải */}
            <div className={`p-6 border-b-4 border-slate-100 flex items-center gap-4 ${currentCategory.color} bg-opacity-10`}>
                <div className={`p-3 rounded-full bg-white shadow-sm border-2 ${currentCategory.color.replace('bg-', 'border-')}`}>
                    <span className="text-3xl">{currentCategory.icon}</span>
                </div>
                <div>
                    <h2 className={`text-3xl font-black uppercase ${currentCategory.color.replace('bg-', 'text-')}`}>
                        {currentCategory.label}
                    </h2>
                    <p className="text-sm font-bold text-slate-500 opacity-80">
                        Danh sách các khối lệnh {currentCategory.label.toLowerCase()}
                    </p>
                </div>
            </div>

            {/* Danh sách Block & Giải thích */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-slate-50/50">
                <div className="grid grid-cols-1 gap-6">
                    {currentCategory.blocks.map((block, idx) => (
                        <div key={idx} className="flex items-center gap-6 p-4 transition-all bg-white border-2 shadow-sm group rounded-2xl border-slate-200 hover:shadow-md hover:border-slate-300">
                            
                            {/* HÌNH ẢNH BLOCK (Lấy từ folder ui) */}
                            <div className="flex items-center justify-center w-24 h-24 p-2 border shrink-0 bg-slate-50 rounded-xl border-slate-100">
                                <img 
                                    src={`/assets/images/ui/${block.img}`} 
                                    alt={block.text}
                                    className="object-contain w-full h-full transition-transform transform pixelated drop-shadow-md group-hover:scale-110"
                                />
                            </div>

                            {/* TEXT GIẢI THÍCH */}
                            <div className="flex-1">
                                <h3 className="mb-1 text-xl font-black transition-colors text-slate-800 group-hover:text-blue-600">
                                    {block.text}
                                </h3>
                                <p className="text-base font-medium leading-relaxed text-slate-600">
                                    {block.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="h-10"></div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default TutorialScreen;