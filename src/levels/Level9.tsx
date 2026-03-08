import React from 'react';
import BlockCodingLevel from '../components/BlockCodingLevel';

export default function Level9({ onPass }: { onPass: () => void }) {
  return (
    <BlockCodingLevel
      gridSize={{ w: 5, h: 5 }}
      start={{ x: 0, y: 0 }}
      target={{ x: 4, y: 4 }}
      obstacles={[{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }]}
      playerEmoji="🐕"
      targetEmoji="🦴"
      obstacleEmoji="🚧"
      onPass={onPass}
    />
  );
}
