import React from 'react';
import BlockCodingLevel from '../components/BlockCodingLevel';

export default function Level8({ onPass }: { onPass: () => void }) {
  return (
    <BlockCodingLevel
      gridSize={{ w: 5, h: 4 }}
      start={{ x: 0, y: 3 }}
      target={{ x: 4, y: 0 }}
      obstacles={[{ x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }]}
      playerEmoji="🐸"
      targetEmoji="🪰"
      obstacleEmoji="🌳"
      onPass={onPass}
    />
  );
}
