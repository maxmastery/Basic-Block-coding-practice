import React, { useState, useEffect } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { audio } from '../utils/audio';

interface Item {
  id: string;
  name: string;
  emoji: string;
}

interface OrderingLevelProps {
  items: Item[];
  correctOrder: string[];
  onPass: () => void;
  label: string;
}

export default function OrderingLevel({ items, correctOrder, onPass, label }: OrderingLevelProps) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(correctOrder.length).fill(null));

  const handleDrop = (itemId: string, zoneIndexStr: string) => {
    const zoneIndex = parseInt(zoneIndexStr, 10);
    audio.playClick();
    setSlots(prev => {
      const newSlots = [...prev];
      // Remove item from previous slot if it exists
      const oldIndex = newSlots.indexOf(itemId);
      if (oldIndex !== -1) newSlots[oldIndex] = null;
      newSlots[zoneIndex] = itemId;
      return newSlots;
    });
  };

  useEffect(() => {
    if (slots.every((val, index) => val === correctOrder[index])) {
      onPass();
    } else if (slots.every(val => val !== null)) {
      audio.playError();
      setTimeout(() => setSlots(Array(correctOrder.length).fill(null)), 1000);
    }
  }, [slots, correctOrder, onPass]);

  return (
    <div className="flex flex-col gap-12 items-center w-full max-w-4xl">
      <div className="flex flex-wrap gap-6 bg-white p-8 rounded-3xl shadow-sm justify-center w-full">
        {items.map(item => (
          !slots.includes(item.id) && (
            <Draggable key={item.id} id={item.id} className="w-28 h-28 bg-blue-50 rounded-2xl flex flex-col items-center justify-center border-2 border-blue-200 shadow-sm hover:bg-blue-100 transition-colors">
              <span className="text-5xl mb-2">{item.emoji}</span>
              <span className="text-base font-bold text-slate-600">{item.name}</span>
            </Draggable>
          )
        ))}
        {items.every(item => slots.includes(item.id)) && (
          <div className="h-28 flex items-center justify-center text-slate-400 font-medium">
            ลากชิ้นส่วนทั้งหมดไปวางแล้ว
          </div>
        )}
      </div>

      <div className="w-full bg-slate-200 p-8 rounded-3xl shadow-inner">
        <h3 className="text-2xl font-bold text-slate-700 mb-8 text-center">{label}</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {slots.map((slotItemId, index) => {
            const item = items.find(i => i.id === slotItemId);
            return (
              <div key={index} className="flex flex-col items-center gap-3">
                <span className="font-bold text-slate-500 bg-white px-4 py-1 rounded-full shadow-sm text-sm">อันดับ {index + 1}</span>
                <Droppable id={index.toString()} onDrop={handleDrop} className="w-32 h-32 bg-white rounded-2xl border-4 border-dashed border-slate-300 flex items-center justify-center transition-colors">
                  {item && (
                    <div className="w-full h-full bg-blue-50 rounded-xl flex flex-col items-center justify-center">
                      <span className="text-5xl mb-2">{item.emoji}</span>
                      <span className="text-base font-bold text-slate-600">{item.name}</span>
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
