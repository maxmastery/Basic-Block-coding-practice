import React from 'react';
import { Home, ArrowRight, RotateCcw } from 'lucide-react';
import { audio } from '../utils/audio';

interface LevelContainerProps {
  level: number;
  title: string;
  onHome: () => void;
  onNext: () => void;
  isPassed: boolean;
  children: React.ReactNode;
  onReset?: () => void;
}

export default function LevelContainer({ 
  level, 
  title, 
  onHome, 
  onNext, 
  isPassed, 
  children,
  onReset
}: LevelContainerProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => { audio.playClick(); onHome(); }} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Home className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">Level {level}: {title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { audio.playClick(); onReset?.(); }} className="p-2 rounded-full hover:bg-slate-100 transition-colors" title="เริ่มใหม่">
            <RotateCcw className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative">
        {children}

        {/* Success Modal */}
        {isPassed && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-3">ยอดเยี่ยมมาก!</h2>
              <p className="text-lg text-slate-600 mb-8">คุณผ่านด่านนี้แล้ว</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => { audio.playClick(); onHome(); }} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  หน้าแรก
                </button>
                {level < 10 && (
                  <button onClick={() => { audio.playClick(); onNext(); }} className="px-6 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 flex items-center gap-2 transition-colors shadow-md hover:shadow-lg">
                    ด่านต่อไป <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
