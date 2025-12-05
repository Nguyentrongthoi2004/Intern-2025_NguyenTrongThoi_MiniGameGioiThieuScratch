// src/components/Menu/MainMenu.jsx
import React from 'react';

const MainMenu = ({ onStart, onTutorial }) => {

  // Hàm xử lý tạm thời
  const showNotImpl = (feature) => {
    alert(`Tính năng [${feature}] đang được phát triển!`);
  };

  // Style chung cho các nút (để đỡ phải viết lại dài dòng)
  const baseButtonStyle = "w-full text-white font-bold py-3 px-6 rounded-2xl active:translate-y-1 transition-all text-lg uppercase tracking-wider border-2 flex items-center justify-center gap-3 shadow-lg";

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden font-sans text-white">
      
      {/* --- BACKGROUND --- */}
      <div 
        className="absolute inset-0 z-0 animate-bg-scroll"
        style={{
            backgroundImage: "url('/assets/images/bg-stage.png')", 
            backgroundPosition: 'center bottom', 
        }}
      ></div>
      {/* Lớp phủ tối màu (Tăng lên 50% để nút nổi hơn trên nền Minecraft) */}
      <div className="absolute inset-0 z-0 bg-black/50"></div>
      {/* ------------------ */}


      {/* --- LOGO --- */}
      <div className="relative z-10 mb-8 text-center animate-bounce">
        <h1 className="text-6xl font-extrabold tracking-wider drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] text-yellow-300 stroke-black">
          SCRATCH
        </h1>
        <h2 className="mt-2 text-3xl font-bold text-white drop-shadow-md">
          LOGIC MASTER
        </h2>
      </div>

      {/* --- KHU VỰC MENU (5 NÚT ĐỒNG NHẤT) --- */}
      {/* Tăng chiều rộng lên w-80 để chứa đủ chữ */}
      <div className="relative z-10 flex flex-col gap-4 w-80">
        
        {/* 1. Nút Bắt đầu (Xanh lá) */}
        <button 
          onClick={onStart}
          className={`${baseButtonStyle} bg-green-500 hover:bg-green-400 border-green-600 shadow-[0_4px_0_rgb(21,128,61)] active:shadow-[0_2px_0_rgb(21,128,61)]`}
        >
          ▶ Bắt đầu
        </button>

        {/* 2. Nút Hướng dẫn (Xanh dương) */}
        <button 
          onClick={onTutorial}
          className={`${baseButtonStyle} bg-blue-500 hover:bg-blue-400 border-blue-600 shadow-[0_4px_0_rgb(29,78,216)] active:shadow-[0_2px_0_rgb(29,78,216)]`}
        >
          📖 Hướng dẫn
        </button>

        {/* 3. Nút Bảng xếp hạng (Vàng) */}
        <button 
          onClick={() => showNotImpl('Bảng xếp hạng')}
          className={`${baseButtonStyle} bg-yellow-400 hover:bg-yellow-300 border-yellow-500 shadow-[0_4px_0_rgb(202,138,4)] active:shadow-[0_2px_0_rgb(202,138,4)]`}
        >
          🏆 Bảng xếp hạng
        </button>

        {/* 4. Nút Cài đặt (Xám) */}
        <button 
          onClick={() => showNotImpl('Cài đặt')}
          className={`${baseButtonStyle} bg-gray-500 hover:bg-gray-400 border-gray-600 shadow-[0_4px_0_rgb(75,85,99)] active:shadow-[0_2px_0_rgb(75,85,99)]`}
        >
          ⚙️ Cài đặt game
        </button>

        {/* 5. Nút Tác giả (Đỏ) */}
        <button 
          onClick={() => alert("Game được thực hiện bởi [Tên Bạn] - Internship 2025")}
          className={`${baseButtonStyle} bg-red-500 hover:bg-red-400 border-red-600 shadow-[0_4px_0_rgb(185,28,28)] active:shadow-[0_2px_0_rgb(185,28,28)]`}
        >
          ℹ️ Về tác giả
        </button>
      </div>

      <p className="absolute z-10 text-xs font-bold bottom-2 text-white/60 drop-shadow-md">
        v1.0.0 - Internship Project
      </p>
    </div>
  );
};

export default MainMenu;