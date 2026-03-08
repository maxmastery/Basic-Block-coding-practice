import React, { useState, useEffect } from 'react';
import { Draggable } from '../components/Draggable';
import { Droppable } from '../components/Droppable';
import { audio } from '../utils/audio';

export default function Level3({ onPass }: { onPass: () => void }) {
  const [stack, setStack] = useState<string[]>([]);
  
  const ingredients = [
    { id: 'top', name: 'ขนมปังบน', color: 'bg-amber-200 border-amber-400 rounded-t-[3rem] h-20' },
    { id: 'lettuce', name: 'ผักกาด', color: 'bg-green-400 border-green-500 h-10 rounded-xl' },
    { id: 'meat', name: 'เนื้อ', color: 'bg-amber-800 border-amber-900 h-14 rounded-2xl' },
    { id: 'bottom', name: 'ขนมปังล่าง', color: 'bg-amber-200 border-amber-400 rounded-b-3xl h-16' },
  ];

  const handleDrop = (itemId: string) => {
    if (stack.includes(itemId)) return;
    audio.playClick();
    setStack(prev => [...prev, itemId]);
  };

  useEffect(() => {
    const correctOrder = ['bottom', 'meat', 'lettuce', 'top'];
    if (stack.length === 4) {
      if (stack.every((val, index) => val === correctOrder[index])) {
        onPass();
      } else {
        audio.playError();
        setTimeout(() => setStack([]), 1000);
      }
    }
  }, [stack, onPass]);

  return (
    <div className="flex flex-col md:flex-row gap-12 items-center w-full max-w-5xl">
      <div className="flex flex-wrap md:flex-col gap-4 bg-white p-8 rounded-3xl shadow-sm w-full md:w-72">
        <h3 className="text-xl font-bold text-slate-700 mb-4 text-center w-full">วัตถุดิบ</h3>
        {ingredients.map(ing => (
          !stack.includes(ing.id) && (
            <Draggable key={ing.id} id={ing.id} className={`w-full flex items-center justify-center border-4 font-bold text-slate-700 shadow-sm text-lg hover:brightness-95 transition-all cursor-grab ${ing.color}`}>
              {ing.name}
            </Draggable>
          )
        ))}
        {stack.length === 4 && (
          <div className="text-center text-slate-400 font-medium py-4">
            ใช้วัตถุดิบครบแล้ว
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-end bg-slate-100 p-12 rounded-[3rem] shadow-inner min-h-[500px] w-full">
        <Droppable id="plate" onDrop={handleDrop} className="w-full h-full flex flex-col-reverse items-center justify-start gap-1 pb-4 border-b-8 border-slate-300">
          {stack.length === 0 && <span className="text-slate-400 font-medium text-xl my-auto">วางวัตถุดิบที่นี่ตามลำดับ<br/>(เริ่มจากล่างขึ้นบน)</span>}
          {stack.map(id => {
            const ing = ingredients.find(i => i.id === id);
            return (
              <div key={id} className={`w-64 flex items-center justify-center border-4 font-bold text-slate-700 shadow-md text-xl ${ing?.color}`}>
                {ing?.name}
              </div>
            );
          })}
        </Droppable>
        <div className="w-80 h-6 bg-slate-300 rounded-full mt-2 shadow-sm"></div>
      </div>
    </div>
  );
}
