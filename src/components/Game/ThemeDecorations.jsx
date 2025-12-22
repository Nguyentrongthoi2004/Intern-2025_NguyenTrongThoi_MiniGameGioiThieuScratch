import React from 'react';
import { motion } from 'framer-motion';

const ThemeDecorationsComponent = ({ theme, lowEffects, fxDensity }) => {
  const isDark = theme === 'dark';
  const density = Math.max(0, Math.min(100, fxDensity ?? 60));
  const fx = lowEffects ? 0 : density / 100;

  if (fx === 0) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
        <div className="absolute bottom-0 left-1/2 w-[900px] h-[200px] -translate-x-1/2 rounded-full" style={{ background: isDark ? 'radial-gradient(circle at top, rgba(15,118,110,0.5), transparent 70%)' : 'radial-gradient(circle at top, rgba(56,189,248,0.6), transparent 70%)', filter: 'blur(40px)', opacity: 0.25 }} />
      </div>
    );
  }

  if (lowEffects) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
      </div>
    );
  }

  const lightStarCount = Math.round(4 + fx * 32);
  const darkStarCount = Math.round(5 + fx * 35);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ background: isDark ? 'radial-gradient(circle at top, #020617 0, #020617 40%, #020617 100%)' : 'linear-gradient(to bottom, #e0f2fe 0%, #bfdbfe 40%, #fef3c7 100%)' }} />
      {!isDark && (
        <>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top, #e0f2fe 0%, #bae6fd 45%, #93c5fd 75%, #60a5fa 100%)', opacity: 0.2 + fx * 0.8 }} />
          <div className="absolute inset-x-[-20%] bottom-[-30%] h-[120%]" style={{ opacity: fx * 0.7, backgroundImage: 'linear-gradient(rgba(56,189,248,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.6) 1px, transparent 1px)', backgroundSize: '90px 90px', transform: 'perspective(700px) rotateX(67deg) translateY(-40px) scale(1.35)' }} />
          <div className="absolute bottom-0 left-1/2 w-[1300px] h-[260px] -translate-x-1/2" style={{ background: 'radial-gradient(circle at top, rgba(125,211,252,1), transparent 70%)', opacity: fx * 0.9, filter: `blur(${20 + fx * 60}px)` }} />
          <motion.div className="absolute rounded-full top-12 right-16 w-28 h-28 will-change-transform" style={{ background: 'radial-gradient(circle at 30% 30%, #fef9c3, #fde047, #fb923c)', boxShadow: '0 0 60px rgba(253,224,71,0.9), 0 0 140px rgba(251,191,36,0.7)', opacity: 0.4 + fx * 0.6 }} animate={{ y: [0, -6, 0], scale: [1, 1.03, 1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          {Array.from({ length: lightStarCount }).map((_, i) => (
            <motion.div key={i} className="absolute bg-white rounded-full" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 65}%`, left: `${Math.random() * 100}%`, opacity: 0.1 + fx * 0.9 }} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
          ))}
          {[0, 1].map((i) => (
            <motion.div key={i} className="absolute -top-10 left-[-30%] w-[70vw] h-10 bg-gradient-to-r from-cyan-300/60 via-sky-400/70 to-transparent skew-y-[-10deg] will-change-transform" style={{ opacity: 0.1 + fx * 0.8 }} animate={{ x: ['-30vw', '120vw'] }} transition={{ duration: 26 + i * 6, repeat: Infinity, delay: i * 4, ease: 'linear' }} />
          ))}
        </>
      )}
      {isDark && (
        <>
          <motion.div className="absolute left-[-10%] top-[12%] w-[120%] h-[150px] will-change-transform" style={{ background: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.55), transparent 60%), radial-gradient(circle at 50% 40%, rgba(217,70,239,0.55), transparent 65%), radial-gradient(circle at 80% 60%, rgba(56,189,248,0.55), transparent 65%)`, filter: `blur(${40 + fx * 40}px)`, opacity: 0.15 + fx * 0.6 }} animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-x-[-20%] bottom-[-35%] h-[120%]" style={{ opacity: fx * 0.55, backgroundImage: 'linear-gradient(rgba(8,145,178,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.6) 1px, transparent 1px)', backgroundSize: '80px 80px', transform: 'perspective(650px) rotateX(68deg) translateY(-40px) scale(1.4)' }} />
          <div className="absolute bottom-0 left-1/2 w-[1300px] h-[320px] -translate-x-1/2" style={{ background: 'radial-gradient(circle at top, rgba(56,189,248,0.95), transparent 65%)', filter: `blur(${40 + fx * 50}px)`, opacity: fx * 0.85 }} />
          <motion.div className="absolute rounded-full top-10 right-16 w-28 h-28 will-change-transform" style={{ background: 'radial-gradient(circle at 25% 30%, #e2e8f0, #94a3b8, #64748b)', boxShadow: 'inset -6px -6px 18px rgba(15,23,42,0.95), 0 0 40px rgba(168,85,247,0.9)', opacity: 0.35 + fx * 0.65 }} animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="absolute w-5 h-5 rounded-full top-4 left-6 bg-slate-500/25" />
            <div className="absolute rounded-full bottom-6 right-7 w-7 h-7 bg-slate-500/25" />
          </motion.div>
          {Array.from({ length: darkStarCount }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-cyan-100" style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%` }} animate={{ opacity: [0, 0.7 + fx * 0.3, 0] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }} />
          ))}
          {[0, 1].map((i) => (
            <motion.div key={i} className="absolute -top-8 left-[-25%] w-[70vw] h-9 bg-gradient-to-r from-purple-500/50 via-cyan-400/50 to-transparent skew-y-[-10deg] will-change-transform" style={{ opacity: 0.15 + fx * 0.7 }} animate={{ x: ['-30vw', '120vw'] }} transition={{ duration: 26 + i * 6, repeat: Infinity, delay: 2 + i * 4, ease: 'linear' }} />
          ))}
        </>
      )}
    </div>
  );
};

const ThemeDecorations = React.memo(ThemeDecorationsComponent);
ThemeDecorations.displayName = 'ThemeDecorations';

export default ThemeDecorations;
