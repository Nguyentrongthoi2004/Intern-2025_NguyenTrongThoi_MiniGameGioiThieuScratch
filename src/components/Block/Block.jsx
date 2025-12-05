// src/components/Block/Block.jsx
import React from 'react';

const Block = ({ type, text, onClick }) => {
  
  // 1. CẤU HÌNH MÀU SẮC (Theo chuẩn ScratchJr)
  const getStyle = (t) => {
    switch (t) {
      case 'motion': return 'bg-blue-500 border-blue-700 shadow-[0_4px_0_#1d4ed8]'; // Xanh dương
      case 'events': return 'bg-yellow-400 border-yellow-600 shadow-[0_4px_0_#ca8a04]'; // Vàng
      case 'looks': return 'bg-purple-500 border-purple-700 shadow-[0_4px_0_#7e22ce]'; // Tím
      case 'control': return 'bg-orange-400 border-orange-600 shadow-[0_4px_0_#c2410c]'; // Cam
      default: return 'bg-gray-500 border-gray-700';
    }
  };

  // 2. TÁCH SỐ RA KHỎI CHỮ
  // Ví dụ: "Move 10 steps" -> val = 10
  // Ví dụ: "Move -10 steps" -> val = 10 (Hướng sẽ xử lý bằng icon)
  const valMatch = text.match(/-?\d+/);
  const rawVal = valMatch ? parseInt(valMatch[0]) : null;
  const displayVal = rawVal ? Math.abs(rawVal) : null; // Luôn hiển thị số dương trong bong bóng

  // 3. CHỌN ICON DỰA VÀO NỘI DUNG
  const renderIcon = () => {
    // Nếu là lệnh Move
    if (text.includes("Move")) {
        // Nếu số âm -> Mũi tên trái, Số dương -> Mũi tên phải
        if (text.includes("-")) {
            return (
                // Icon Mũi tên Trái (SVG)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            );
        } else {
            return (
                // Icon Mũi tên Phải (SVG)
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            );
        }
    }
    
    // Nếu là lệnh Turn (Xoay)
    if (text.includes("Turn right")) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        );
    }
    if (text.includes("Turn left")) {
        // Icon xoay trái (tạm dùng icon refresh lật ngược hoặc tương tự)
        return (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10 -scale-x-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        );
    }

    // Nếu là Sự kiện (Lá cờ, Click)
    if (type === 'events') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
        );
    }

    // Các trường hợp khác: Icon tròn mặc định
    return <div className="w-6 h-6 border-4 border-white rounded-full"></div>;
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative 
        w-20 h-20 
        rounded-xl 
        border-4 
        flex flex-col items-center justify-center 
        cursor-pointer 
        transition-all duration-100 hover:scale-110 active:scale-95
        ${getStyle(type)}
      `}
      title={text} // Rê chuột vào vẫn hiện chữ gốc để nhắc
    >
      {/* 1. ICON CHÍNH GIỮA */}
      <div className="mb-1 drop-shadow-md">
        {renderIcon()}
      </div>

      {/* 2. BONG BÓNG SỐ (INPUT) Ở DƯỚI */}
      {/* Chỉ hiện nếu lệnh có số (displayVal khác null) */}
      {displayVal !== null && (
        <div className="absolute -bottom-3 bg-white text-black font-black text-sm px-2 py-0.5 rounded-full border-2 border-gray-300 shadow-sm min-w-[30px] text-center">
            {displayVal}
        </div>
      )}

      {/* 3. CÁI KHỚP NỐI (Jigsaw Connector) BÊN PHẢI */}
      <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-6 rounded-r-md ${getStyle(type).split(' ')[0]}`}></div>
      
    </div>
  );
};

export default Block;