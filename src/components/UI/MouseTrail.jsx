// src/components/UI/MouseTrail.jsx
import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
  // Dùng ref để lưu màu hiện tại (để tạo hiệu ứng cầu vồng liên tục)
  const hueRef = useRef(0);

  useEffect(() => {
    let lastTime = 0;

    // Hàm tạo hạt (Particle)
    const createParticle = (x, y, isExplosion = false) => {
      const particle = document.createElement('div');
      
      // 1. MÀU SẮC RGB GAMING
      // Tăng màu dần dần để tạo dải cầu vồng
      const hue = hueRef.current; 
      const color = `hsl(${hue}, 100%, 60%)`; 

      // 2. KÍCH THƯỚC NGẪU NHIÊN
      // Nếu là nổ (click) thì hạt to hơn chút
      const size = isExplosion ? Math.random() * 10 + 6 : Math.random() * 6 + 4;
      
      Object.assign(particle.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`, // Glow phát sáng
        pointerEvents: 'none',
        zIndex: '9999',
        borderRadius: '2px', // Bo nhẹ đúng chất pixel
      });

      // 3. VẬT LÝ (PHYSICS)
      // Tính toán hướng bay
      // Nếu là nổ (click): Bay tung tóe 360 độ mạnh hơn
      // Nếu là di chuột: Bay nhẹ sang hai bên
      const velocity = isExplosion ? 150 : 60;
      const angle = Math.random() * Math.PI * 2;
      const velocityX = Math.cos(angle) * (Math.random() * velocity);
      const velocityY = Math.sin(angle) * (Math.random() * velocity);

      // Animation phức tạp hơn: Có quán tính và trọng lực
      const animation = particle.animate([
        { 
          transform: `translate(0, 0) rotate(0deg) scale(1)`, 
          opacity: 1 
        },
        { 
          // Bay theo hướng ngẫu nhiên + Rơi xuống (Trọng lực +100px)
          transform: `translate(${velocityX}px, ${velocityY + 100}px) rotate(${Math.random() * 360}deg) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: isExplosion ? 1000 : 600, // Nổ thì tồn tại lâu hơn
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)', // Easing vật lý (Nhanh ở đầu, chậm dần)
        fill: 'forwards'
      });

      document.body.appendChild(particle);
      animation.onfinish = () => particle.remove();
    };

    // --- XỬ LÝ DI CHUỘT (TRAIL) ---
    const handleMouseMove = (e) => {
      // Cập nhật màu cầu vồng
      hueRef.current = (hueRef.current + 2) % 360;

      const now = Date.now();
      // Giới hạn tốc độ tạo hạt (tránh lag)
      if (now - lastTime > 15) { 
        createParticle(e.clientX, e.clientY, false);
        lastTime = now;
      }
    };

    // --- XỬ LÝ CLICK (EXPLOSION) ---
    const handleMouseDown = (e) => {
      // Khi click, tạo ra 10 hạt cùng lúc bắn tung tóe
      for (let i = 0; i < 12; i++) {
        createParticle(e.clientX, e.clientY, true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
};

export default MouseTrail;