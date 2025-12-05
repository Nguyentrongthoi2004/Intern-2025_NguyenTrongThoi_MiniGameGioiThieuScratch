// src/components/Menu/DifficultySelection.jsx
import React from 'react';

const DifficultySelection = ({ onSelectDifficulty, onBack }) => {
  
  // Danh sách dữ liệu độ khó
  const difficulties = [
    { 
      id: 'easy', 
      label: 'Dễ (Easy)', 
      desc: 'Làm quen với các lệnh di chuyển cơ bản.', 
      color: 'bg-green-500 border-green-600',
      shadow: 'shadow-[0_6px_0_rgb(21,128,61)] active:shadow-[0_2px_0_rgb(21,128,61)]', // Màu bóng đổ xanh đậm
      icon: '🌱'
    },
    { 
      id: 'normal', 
      label: 'Thường (Normal)', 
      desc: 'Thử thách với Vòng lặp và Logic.', 
      color: 'bg-yellow-400 border-yellow-500',
      shadow: 'shadow-[0_6px_0_rgb(202,138,4)] active:shadow-[0_2px_0_rgb(202,138,4)]', // Màu bóng đổ vàng đậm
      icon: '⚡'
    },
    { 
      id: 'hard', 
      label: 'Khó (Hard)', 
      desc: 'Gỡ lỗi (Debug) và thuật toán phức tạp.', 
      color: 'bg-red-500 border-red-600',
      shadow: 'shadow-[0_6px_0_rgb(185,28,28)] active:shadow-[0_2px_0_rgb(185,28,28)]', // Màu bóng đổ đỏ đậm
      icon: '🔥'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white">
      
      {/* --- BACKGROUND (Dùng chung với Menu) --- */}
      <div 
        className="absolute inset-0 z-0 animate-bg-scroll"
        style={{
            backgroundImage: "url('/assets/images/bg-stage.png')", 
            backgroundPosition: 'center bottom', 
        }}
      ></div>
      {/* Lớp phủ tối màu (Tăng độ tối lên 60% để chữ trắng nổi bật trên nền rực rỡ) */}
      <div className="absolute inset-0 z-0 bg-black/60"></div>
      
      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl p-4">
        
        {/* Tiêu đề */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          Chọn cấp độ thử thách
        </h1>

        {/* Danh sách 3 thẻ độ khó */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {difficulties.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectDifficulty(item.id)}
              className={`
                relative group p-8 rounded-3xl border-2 transition-all duration-200 
                active:translate-y-1 
                flex flex-col items-center text-center 
                ${item.color} ${item.shadow}
              `}
            >
              {/* Icon phóng to khi hover */}
              <div className="mb-6 transition-transform duration-300 text-7xl drop-shadow-md group-hover:scale-110">
                {item.icon}
              </div>
              
              <h2 className="mb-3 text-3xl font-extrabold uppercase drop-shadow-sm">
                {item.label}
              </h2>
              
              <p className="text-lg font-medium leading-relaxed text-white/90">
                {item.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Nút Quay lại (Đã thiết kế lại TO & ĐẸP hơn) */}
        <div className="mt-16">
          <button 
            onClick={onBack}
            className="
              bg-gray-600 hover:bg-gray-500 text-white 
              font-bold py-4 px-12 rounded-full 
              shadow-[0_6px_0_rgb(55,65,81)] active:shadow-[0_2px_0_rgb(55,65,81)] 
              active:translate-y-1 transition-all 
              border-2 border-gray-400 
              uppercase tracking-widest text-lg flex items-center gap-3
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại Menu
          </button>
        </div>

      </div>
    </div>
  );
};

export default DifficultySelection;