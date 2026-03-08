import React from 'react';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export function Draggable({ id, children, className }: DraggableProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id);
        e.currentTarget.style.opacity = '0.5';
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
      className={`cursor-grab active:cursor-grabbing ${className || ''}`}
    >
      {children}
    </div>
  );
}
