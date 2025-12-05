// src/components/Block/Block.jsx
import React from 'react';

const Block = ({ type, text, onClick, theme = 'light' }) => {
  
  const valMatch = text.match(/-?\d+/);
  const rawVal = valMatch ? parseInt(valMatch[0]) : null;
  const displayVal = rawVal ? Math.abs(rawVal) : null;

  const getIconImage = () => {
    if (text.includes("Move") && !text.includes("-")) return "right.png";
    if (text.includes("Move") && text.includes("-")) return "left.png";
    if (text.includes("Turn right")) return "turnright.png";
    if (text.includes("Turn left")) return "turnleft.png";
    if (text.includes("Go to")) return "gohome.png";
    
    if (text.includes("clicked") || text.includes("tap")) return "ontap.png";
    if (text.includes("flag")) return "onflag.png";
    
    if (text.includes("Say")) return "say.png";
    if (text.includes("Hide")) return "hide.png";
    if (text.includes("Show")) return "show.png";
    
    if (text.includes("Wait")) return "wait.png";
    if (text.includes("Repeat")) return "repeat.png";
    if (text.includes("Stop")) return "stop.png";
    if (text.includes("Speed")) return "speed.png";

    if (text.includes("End")) return "end.png";
    if (text.includes("Forever")) return "forever.png";
    if (text.includes("Page")) return "page.png";
    
    return null;
  };

  const imageName = getIconImage();

  // --- MÀU CHỦ ĐẠO ---
  const getThemeColor = () => {
    switch(type) {
        case 'motion':  return '#3b82f6'; // Xanh
        case 'events':  return '#fbbf24'; // Vàng
        case 'looks':   return '#d946ef'; // Tím
        case 'control': return '#f97316'; // Cam
        case 'end':     return '#ef4444'; // Đỏ
        default:        return '#ffffff';
    }
  };
  const neonColor = getThemeColor();

  // Filter cho Block chính (Glow mạnh)
  const getBlockFilter = () => {
    return `drop-shadow(0 0 2px ${neonColor}) drop-shadow(0 0 6px ${neonColor})`;
  };

  return (
    <div 
      onClick={onClick}
      className="relative z-10 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group hover:z-50"
      title={text}
    >
      {imageName ? (
        <div className="relative flex flex-col items-center">
            
            {/* 1. KHỐI LỆNH CHÍNH (Có viền sáng neon) */}
            <img 
                src={`/assets/images/ui/${imageName}`} 
                alt={text}
                className="relative z-10 object-contain w-20 h-auto pixelated"
                style={{ filter: getBlockFilter() }} 
            />
            
            {/* 2. Ô SỐ "ĐỈNH CAO" (LUXURY BADGE) */}
            {displayVal !== null && (
                <div 
                    className="absolute bottom-[4px] left-[45%] -translate-x-1/2 z-20 flex items-center justify-center"
                    style={{
                        minWidth: '36px',
                        height: '22px',
                        borderRadius: '12px', // Bo tròn kiểu viên thuốc (Capsule)
                        
                        // MÀU NỀN: Trắng pha chút màu của block để đồng bộ
                        backgroundColor: '#ffffff',
                        
                        // VIỀN & BÓNG ĐỔ 3D (Bí mật của sự sang trọng)
                        boxShadow: `
                            inset 0 -2px 4px rgba(0,0,0,0.1), /* Bóng trong tạo độ sâu */
                            0 2px 4px rgba(0,0,0,0.2),        /* Bóng đổ xuống nền */
                            0 0 8px ${neonColor},             /* Hào quang màu trùng block */
                            0 0 0 2px white                   /* Viền trắng cứng bao ngoài */
                        `,
                        border: `1px solid ${neonColor}` // Viền mỏng màu block
                    }}
                >
                    {/* Hiệu ứng bóng kính (Glossy) ở nửa trên */}
                    <div className="absolute top-0 left-0 w-full rounded-t-full h-1/2 bg-gradient-to-b from-white to-transparent opacity-80"></div>

                    {/* Con số */}
                    <span 
                        className="relative z-10 text-sm font-black leading-none"
                        style={{ 
                            color: '#1e293b', // Màu chữ xám đen sang trọng
                            textShadow: '0 1px 0 rgba(255,255,255,1)' // Bóng chữ trắng để nét hơn
                        }}
                    >
                        {displayVal}
                    </span>
                </div>
            )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-16 h-16 p-1 text-xs font-bold text-center text-white bg-gray-400 border-2 border-gray-500 rounded-lg">
            {text}
        </div>
      )}
      
    </div>
  );
};

export default Block;