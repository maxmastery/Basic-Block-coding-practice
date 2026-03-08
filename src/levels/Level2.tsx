import React, { useState, useEffect } from 'react';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { audio } from '../utils/audio';

export default function Level2({ onPass }: { onPass: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string | null>>({ s1: null, s2: null, s3: null });
  const numbers = ['1', '2', '3'];

  const handleDrop = (itemId: string, zoneId: string) => {
    audio.playClick();
    setPlaced(prev => ({ ...prev, [zoneId]: itemId }));
  };

  useEffect(() => {
    if (placed.s1 === '1' && placed.s2 === '2' && placed.s3 === '3') {
      onPass();
    } else if (placed.s1 && placed.s2 && placed.s3) {
      audio.playError();
      setTimeout(() => setPlaced({ s1: null, s2: null, s3: null }), 1000);
    }
  }, [placed, onPass]);

  return (
    <div className="flex flex-col gap-16 items-center w-full max-w-4xl">
      <div className="flex gap-8 bg-white p-8 rounded-3xl shadow-sm w-full justify-center min-h-[160px]">
        {numbers.map(n => (
          !Object.values(placed).includes(n) && (
            <Draggable key={n} id={n} className="w-28 h-28 bg-yellow-100 rounded-2xl flex items-center justify-center border-4 border-yellow-400 text-5xl font-bold text-yellow-600 shadow-md hover:bg-yellow-200 transition-colors">
              {n}
            </Draggable>
          )
        ))}
        {numbers.every(n => Object.values(placed).includes(n)) && (
          <div className="flex items-center justify-center text-slate-400 font-medium text-lg">
            ลากตัวเลขทั้งหมดไปวางแล้ว
          </div>
        )}
      </div>

      <div className="flex gap-6 bg-slate-200 p-12 rounded-[3rem] shadow-inner w-full justify-center">
        {['s1', 's2', 's3'].map((slot, i) => (
          <Droppable key={slot} id={slot} onDrop={handleDrop} className="w-32 h-32 bg-white rounded-2xl border-4 border-dashed border-slate-300 flex items-center justify-center text-5xl font-bold text-slate-700 transition-colors">
            {placed[slot] ? (
              <div className="w-full h-full bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                {placed[slot]}
              </div>
            ) : (
              <span className="text-slate-300 text-xl">ช่อง {i+1}</span>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
}
