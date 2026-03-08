import React from 'react';
import BlockCodingLevel from '../components/BlockCodingLevel';

export default function Level10({ onPass }: { onPass: () => void }) {
  return (
    <BlockCodingLevel
      gridSize={{ w: 6, h: 6 }}
      start={{ x: 0, y: 5 }}
      target={{ x: 5, y: 0 }}
      obstacles={[
        { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 },
        { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
        { x: 1, y: 1 }, { x: 1, y: 2 }
      ]}
      playerEmoji="🚗"
      targetEmoji="🏠"
      obstacleEmoji="🛑"
      onPass={onPass}
    />
  );
}
