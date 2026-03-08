import React from 'react';

interface DroppableProps {
  id: string;
  onDrop: (draggedId: string, dropZoneId: string) => void;
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

export function Droppable({ id, onDrop, children, className }: DroppableProps) {
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add('ring-4', 'ring-blue-400', 'ring-inset');
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove('ring-4', 'ring-blue-400', 'ring-inset');
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('ring-4', 'ring-blue-400', 'ring-inset');
        const draggedId = e.dataTransfer.getData('text/plain');
        if (draggedId) {
          onDrop(draggedId, id);
        }
      }}
      className={className}
    >
      {children}
    </div>
  );
}
