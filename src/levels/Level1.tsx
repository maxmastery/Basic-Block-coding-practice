import React, { useState, useEffect } from 'react';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { Shirt, Footprints } from 'lucide-react';
import { audio } from '../utils/audio';

export default function Level1({ onPass }: { onPass: () => void }) {
  const [placed, setPlaced] = useState<{ top: string | null, bottom: string | null }>({ top: null, bottom: null });

  const handleDrop = (itemId: string, zoneId: string) => {
    audio.playClick();
    setPlaced(prev => ({ ...prev, [zoneId]: itemId }));
  };

  useEffect(() => {
    if (placed.top === 'shirt' && placed.bottom === 'pants') {
      onPass();
    } else if (placed.top !== null && placed.bottom !== null) {
      audio.playError();
      setTimeout(() => setPlaced({ top: null, bottom: null }), 1000);
    }
  }, [placed, onPass]);

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-4xl">
      <div className="flex md:flex-col gap-6 bg-white p-8 rounded-3xl shadow-sm w-full md:w-auto justify-center">
        <h3 className="text-xl font-bold text-slate-700 mb-2 text-center">ชิ้นส่วน</h3>
        {!Object.values(placed).includes('shirt') && (
          <Draggable id="shirt" className="w-32 h-32 bg-blue-100 rounded-2xl flex items-center justify-center border-4 border-blue-300 shadow-sm hover:bg-blue-200 transition-colors">
            <Shirt className="w-16 h-16 text-blue-500" />
          </Draggable>
        )}
        {!Object.values(placed).includes('pants') && (
          <Draggable id="pants" className="w-32 h-32 bg-orange-100 rounded-2xl flex items-center justify-center border-4 border-orange-300 shadow-sm hover:bg-orange-200 transition-colors">
            <Footprints className="w-16 h-16 text-orange-500" />
          </Draggable>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4 bg-slate-200 p-10 rounded-[3rem] shadow-inner items-center w-full">
        <div className="w-32 h-32 bg-slate-300 rounded-full flex items-center justify-center text-slate-500 font-bold text-xl shadow-sm">หัว</div>
        
        <Droppable id="top" onDrop={handleDrop} className="w-64 h-48 bg-white rounded-3xl border-4 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors">
          {placed.top === 'shirt' ? (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center"><Shirt className="w-24 h-24 text-blue-500" /></div>
          ) : placed.top === 'pants' ? (
            <div className="w-full h-full bg-orange-100 flex items-center justify-center"><Footprints className="w-24 h-24 text-orange-500" /></div>
          ) : (
            <span className="text-slate-400 font-medium text-lg">ใส่เสื้อที่นี่</span>
          )}
        </Droppable>

        <Droppable id="bottom" onDrop={handleDrop} className="w-64 h-48 bg-white rounded-3xl border-4 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-colors">
          {placed.bottom === 'pants' ? (
            <div className="w-full h-full bg-orange-100 flex items-center justify-center"><Footprints className="w-24 h-24 text-orange-500" /></div>
          ) : placed.bottom === 'shirt' ? (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center"><Shirt className="w-24 h-24 text-blue-500" /></div>
          ) : (
            <span className="text-slate-400 font-medium text-lg">ใส่กางเกงที่นี่</span>
          )}
        </Droppable>
      </div>
    </div>
  );
}
