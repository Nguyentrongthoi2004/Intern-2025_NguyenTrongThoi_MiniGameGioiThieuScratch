// src/components/UI/SettingsModal.jsx
import React from 'react';

const SettingsModal = ({ onClose, isBlur, toggleBlur, isSound, toggleSound }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      
      {/* Bảng Cài Đặt */}
      <div className="relative p-6 text-white transition-all transform scale-100 border-4 shadow-2xl w-96 bg-slate-800 border-slate-600 rounded-3xl">
        
        {/* Tiêu đề */}
        <h2 className="mb-8 text-3xl font-black tracking-widest text-center uppercase text-cyan-400 drop-shadow-md">
          ⚙️ Cài Đặt
        </h2>

        {/* Danh sách tùy chọn */}
        <div className="space-y-6">
            
            {/* 1. Hiệu ứng Mờ nền (Blur) */}
            <div className="flex items-center justify-between p-4 border-2 bg-slate-700/50 rounded-xl border-slate-600">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">Hiệu ứng Mờ ảo</span>
                    <span className="text-xs text-slate-400">Làm mờ phông nền & mây</span>
                </div>
                {/* Nút Switch */}
                <button 
                    onClick={toggleBlur}
                    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${isBlur ? 'bg-green-500 justify-end' : 'bg-gray-500 justify-start'}`}
                >
                    <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                </button>
            </div>

            {/* 2. Âm thanh (Ví dụ) */}
            <div className="flex items-center justify-between p-4 border-2 bg-slate-700/50 rounded-xl border-slate-600">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">Âm thanh</span>
                    <span className="text-xs text-slate-400">Nhạc nền & Hiệu ứng</span>
                </div>
                <button 
                    onClick={toggleSound}
                    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 flex items-center ${isSound ? 'bg-green-500 justify-end' : 'bg-gray-500 justify-start'}`}
                >
                    <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                </button>
            </div>

        </div>

        {/* Nút Đóng */}
        <button 
            onClick={onClose}
            className="w-full py-3 mt-8 text-xl font-black transition-all bg-red-500 border-b-4 border-red-700 shadow-lg hover:bg-red-400 active:border-b-0 active:translate-y-1 rounded-xl"
        >
            ĐÓNG
        </button>

      </div>
    </div>
  );
};

export default SettingsModal;