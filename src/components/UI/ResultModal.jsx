import React, { useEffect, useState } from 'react';

const ResultModal = ({ type, message, onNext }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Hiệu ứng hiện ra từ từ (Fade in + Scale up)
    setShow(true);
  }, []);

  // Cấu hình màu sắc dựa trên loại thông báo
  const config = {
    correct: { color: 'bg-green-500', border: 'border-green-700', icon: '🎉', title: 'TUYỆT VỜI!' },
    wrong:   { color: 'bg-red-500',   border: 'border-red-700',   icon: '😢', title: 'SAI RỒI!' },
    win:     { color: 'bg-yellow-400', border: 'border-yellow-600', icon: '🏆', title: 'CHIẾN THẮNG!' },
    gameover:{ color: 'bg-gray-700',  border: 'border-gray-900',  icon: '💀', title: 'GAME OVER' }
  };

  const theme = config[type] || config.correct;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div 
        className={`
            transform transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)
            ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
            relative flex flex-col items-center p-8 text-center text-white 
            ${theme.color} border-b-8 ${theme.border} rounded-3xl shadow-2xl w-80
        `}
      >
        {/* Icon to đùng nhảy lên */}
        <div className="mb-4 text-6xl animate-bounce drop-shadow-md">
            {theme.icon}
        </div>

        <h2 className="mb-2 text-3xl font-black tracking-widest uppercase drop-shadow-sm">
            {theme.title}
        </h2>
        
        <p className="mb-6 text-lg font-bold opacity-90">
            {message}
        </p>

        {/* Nút Tiếp tục */}
        <button 
            onClick={onNext}
            className="px-8 py-3 font-black text-gray-800 uppercase transition-all bg-white border-b-4 border-gray-300 rounded-full shadow-lg hover:scale-105 active:scale-95 active:border-b-0"
        >
            {type === 'gameover' || type === 'win' ? 'Về Menu' : 'Tiếp tục ➡'}
        </button>
      </div>
    </div>
  );
};

export default ResultModal;