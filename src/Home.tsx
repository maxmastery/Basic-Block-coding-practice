import React, { useEffect, useState } from 'react';
import { levels } from './data/levels';
import { audio } from './utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

export default function Home({ onSelectLevel }: { onSelectLevel: (id: number) => void }) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isMuted) {
      audio.playBgm();
    } else {
      audio.stopBgm();
    }
    return () => audio.stopBgm();
  }, [isMuted]);

  const toggleMute = () => {
    audio.init();
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 font-sans relative">
      <button 
        onClick={toggleMute}
        className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-slate-600 hover:text-blue-500"
        title={isMuted ? "เปิดเสียงเพลง" : "ปิดเสียงเพลง"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6 drop-shadow-sm">แบบฝึกหัด Block Coding</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            แบบฝึกหัดสำหรับฝึกกระบวนการ Coding ขั้นพื้นฐาน โดยใช้ Block Coding 
            เพื่อฝึกทักษะด้านการคิดเชิงคำนวณ ในการแก้ปัญหา และเป็นพื้นฐานการเขียนโปรแกรมเบื้องต้น
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {levels.map((level) => {
            const Icon = level.icon;
            return (
              <button
                key={level.id}
                onClick={() => { audio.playClick(); onSelectLevel(level.id); }}
                className="bg-gradient-to-b from-green-400 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="bg-white/20 rounded-full px-5 py-1.5 text-sm font-bold mb-6 backdrop-blur-sm shadow-sm">
                  LEVEL {level.id}
                </div>
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{level.title}</h3>
                <p className="text-sm text-green-50 opacity-90 leading-snug">
                  {level.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-20 flex items-center justify-center gap-2">
          <span className="text-[#8c939d] font-medium text-sm tracking-wide">พัฒนาโดย</span>
          <span className="text-[#4a5568] font-bold text-base tracking-wide">Thanit Lab</span>
          <img 
            src="https://drive.google.com/thumbnail?id=1C3Tfeq-p3IPzGIapncHjL4vuljkfNTzn&sz=w400" 
            alt="Thanit Lab Logo" 
            className="h-6 object-contain ml-1"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
