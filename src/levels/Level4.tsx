import React, { useState, useEffect } from 'react';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { audio } from '../utils/audio';

export default function Level4({ onPass }: { onPass: () => void }) {
  const [placed, setPlaced] = useState<Record<string, string | null>>({ tl: null, tr: null, bl: null, br: null });
  const pieces = [
    { id: 'tl', color: 'bg-red-400', label: '1' },
    { id: 'tr', color: 'bg-blue-400', label: '2' },
    { id: 'bl', color: 'bg-green-400', label: '3' },
    { id: 'br', color: 'bg-yellow-400', label: '4' },
  ];

  const handleDrop = (itemId: string, zoneId: string) => {
    audio.playClick();
    setPlaced(prev => ({ ...prev, [zoneId]: itemId }));
  };

  useEffect(() => {
    if (placed.tl === 'tl' && placed.tr === 'tr' && placed.bl === 'bl' && placed.br === 'br') {
      onPass();
    } else if (Object.values(placed).every(v => v !== null)) {
      audio.playError();
      setTimeout(() => setPlaced({ tl: null, tr: null, bl: null, br: null }), 1000);
    }
  }, [placed, onPass]);

  return (
    <div className="flex flex-col gap-12 items-center w-full max-w-4xl">
      <div className="flex gap-6 bg-white p-8 rounded-3xl shadow-sm justify-center w-full min-h-[160px]">
        {pieces.map(p => (
          !Object.values(placed).includes(p.id) && (
            <Draggable key={p.id} id={p.id} className={`w-28 h-28 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-md hover:brightness-110 transition-all ${p.color}`}>
              {p.label}
            </Draggable>
          )
        ))}
        {pieces.every(p => Object.values(placed).includes(p.id)) && (
          <div className="flex items-center justify-center text-slate-400 font-medium text-lg">
            ลากชิ้นส่วนทั้งหมดไปวางแล้ว
          </div>
        )}
      </div>

      <div className="bg-slate-200 p-12 rounded-[3rem] shadow-inner">
        <div className="grid grid-cols-2 gap-2 bg-slate-300 p-2 rounded-3xl">
          {['tl', 'tr', 'bl', 'br'].map(zone => {
            const p = pieces.find(x => x.id === placed[zone]);
            return (
              <Droppable key={zone} id={zone} onDrop={handleDrop} className="w-40 h-40 bg-white rounded-2xl border-4 border-dashed border-slate-400 flex items-center justify-center transition-colors">
                {p && (
                  <div className={`w-full h-full rounded-xl flex items-center justify-center text-white text-5xl font-bold ${p.color}`}>
                    {p.label}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </div>
  );
}
