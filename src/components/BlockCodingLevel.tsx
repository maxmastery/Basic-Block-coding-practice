import React, { useState, useEffect } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { audio } from '../utils/audio';
import { Play, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Position { x: number; y: number; }

interface BlockCodingProps {
  gridSize: { w: number; h: number };
  start: Position;
  target: Position;
  obstacles: Position[];
  playerEmoji: string;
  targetEmoji: string;
  obstacleEmoji: string;
  onPass: () => void;
}

const DIR_ICONS = {
  UP: <ArrowUp className="w-6 h-6" />,
  DOWN: <ArrowDown className="w-6 h-6" />,
  LEFT: <ArrowLeft className="w-6 h-6" />,
  RIGHT: <ArrowRight className="w-6 h-6" />,
};

const DIR_LABELS = {
  UP: 'ขึ้น',
  DOWN: 'ลง',
  LEFT: 'ซ้าย',
  RIGHT: 'ขวา',
};

export default function BlockCodingLevel({ gridSize, start, target, obstacles, playerEmoji, targetEmoji, obstacleEmoji, onPass }: BlockCodingProps) {
  const [program, setProgram] = useState<Direction[]>([]);
  const [playerPos, setPlayerPos] = useState<Position>(start);
  const [isRunning, setIsRunning] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning) {
      setPlayerPos(start);
      setActiveInstruction(null);
    }
  }, [isRunning, start]);

  const handleDrop = (itemId: string) => {
    if (isRunning) return;
    audio.playClick();
    setProgram(prev => [...prev, itemId as Direction]);
  };

  const removeBlock = (index: number) => {
    if (isRunning) return;
    audio.playClick();
    setProgram(prev => prev.filter((_, i) => i !== index));
  };

  const runProgram = async () => {
    if (isRunning || program.length === 0) return;
    setIsRunning(true);
    audio.playClick();

    let currentPos = { ...start };
    let crashed = false;

    for (let i = 0; i < program.length; i++) {
      setActiveInstruction(i);
      const dir = program[i];
      
      const nextPos = { ...currentPos };
      if (dir === 'UP') nextPos.y -= 1;
      if (dir === 'DOWN') nextPos.y += 1;
      if (dir === 'LEFT') nextPos.x -= 1;
      if (dir === 'RIGHT') nextPos.x += 1;

      if (nextPos.x < 0 || nextPos.x >= gridSize.w || nextPos.y < 0 || nextPos.y >= gridSize.h) {
        crashed = true;
      }

      if (obstacles.some(obs => obs.x === nextPos.x && obs.y === nextPos.y)) {
        crashed = true;
      }

      if (crashed) {
        audio.playError();
        break;
      }

      currentPos = nextPos;
      setPlayerPos(currentPos);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      if (currentPos.x === target.x && currentPos.y === target.y) {
        break;
      }
    }

    setActiveInstruction(null);
    
    if (!crashed && currentPos.x === target.x && currentPos.y === target.y) {
      onPass();
    } else {
      if (!crashed) audio.playError();
      setTimeout(() => setIsRunning(false), 1000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
      {/* Game Board */}
      <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center">
        <h3 className="text-2xl font-bold text-slate-700 mb-8">แผนที่</h3>
        <div 
          className="grid gap-2 bg-slate-200 p-4 rounded-2xl shadow-inner"
          style={{ gridTemplateColumns: `repeat(${gridSize.w}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: gridSize.h }).map((_, y) => (
            Array.from({ length: gridSize.w }).map((_, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isTarget = target.x === x && target.y === y;
              const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
              
              return (
                <div key={`${x}-${y}`} className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center text-4xl sm:text-5xl relative shadow-sm">
                  {isTarget && !isPlayer && <span className="absolute">{targetEmoji}</span>}
                  {isObstacle && <span className="absolute">{obstacleEmoji}</span>}
                  {isPlayer && <span className="absolute z-10 transition-all duration-300 drop-shadow-md">{playerEmoji}</span>}
                </div>
              );
            })
          ))}
        </div>
      </div>

      {/* Coding Area */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Available Blocks */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-700 mb-4">บล็อกคำสั่ง</h3>
          <div className="flex flex-wrap gap-3">
            {(['UP', 'DOWN', 'LEFT', 'RIGHT'] as Direction[]).map(dir => (
              <Draggable key={dir} id={dir} className="bg-blue-500 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:bg-blue-600 transition-colors text-lg">
                {DIR_ICONS[dir]} {DIR_LABELS[dir]}
              </Draggable>
            ))}
          </div>
        </div>

        {/* Program Area */}
        <div className="bg-white p-6 rounded-3xl shadow-sm flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-700">พื้นที่เขียนโปรแกรม</h3>
            <button 
              onClick={() => { audio.playClick(); setProgram([]); }}
              disabled={isRunning || program.length === 0}
              className="text-red-500 hover:bg-red-50 p-2 rounded-xl disabled:opacity-50 transition-colors"
              title="ล้างคำสั่งทั้งหมด"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
          
          <Droppable id="program" onDrop={handleDrop} className="flex-1 bg-slate-100 rounded-2xl p-4 flex flex-col gap-3 min-h-[300px] overflow-y-auto border-4 border-dashed border-slate-300">
            {program.length === 0 && (
              <div className="m-auto text-slate-400 font-medium text-center text-lg">
                ลากบล็อกคำสั่งมาวางที่นี่<br/>เพื่อสร้างลำดับการทำงาน
              </div>
            )}
            {program.map((dir, index) => (
              <div 
                key={index} 
                onClick={() => removeBlock(index)}
                className={`bg-blue-500 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-3 shadow-sm cursor-pointer hover:bg-red-500 transition-colors group text-lg ${activeInstruction === index ? 'ring-4 ring-yellow-400 scale-105 z-10' : ''}`}
              >
                <span className="bg-blue-600/50 w-8 h-8 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                {DIR_ICONS[dir]} {DIR_LABELS[dir]}
                <Trash2 className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </Droppable>

          <button 
            onClick={runProgram}
            disabled={isRunning || program.length === 0}
            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-md flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl"
          >
            <Play className="w-7 h-7" /> {isRunning ? 'กำลังทำงาน...' : 'เริ่มทำงาน'}
          </button>
        </div>
      </div>
    </div>
  );
}
