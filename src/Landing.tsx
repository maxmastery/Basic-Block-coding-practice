import React from 'react';
import { Play } from 'lucide-react';
import { audio } from './utils/audio';

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen flex items-end justify-center pb-24 overflow-hidden">
      <img 
        src="https://drive.google.com/thumbnail?id=1fr4YbLdZ4eAVX-pXjxtMQg99q_ISa3ZK&sz=w1920" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover object-top -z-10"
        referrerPolicy="no-referrer"
      />
      <button 
        onClick={() => {
          audio.playClick();
          onStart();
        }}
        className="bg-white/95 backdrop-blur-sm text-blue-600 font-bold text-2xl md:text-4xl py-4 px-10 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:shadow-[0_0_60px_rgba(255,255,255,1)] hover:scale-105 transition-all duration-300 flex items-center gap-4 animate-bounce"
      >
        <Play className="w-8 h-8 md:w-12 md:h-12 fill-current" />
        เข้าสู่แบบฝึกหัด
      </button>
    </div>
  );
}
