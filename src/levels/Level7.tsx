import React from 'react';
import BlockCodingLevel from '../components/BlockCodingLevel';

export default function Level7({ onPass }: { onPass: () => void }) {
  return (
    <BlockCodingLevel
      gridSize={{ w: 4, h: 4 }}
      start={{ x: 0, y: 0 }}
      target={{ x: 3, y: 3 }}
      obstacles={[]}
      playerEmoji="🐱"
      targetEmoji="🐟"
      obstacleEmoji="🪨"
      onPass={onPass}
    />
  );
}
