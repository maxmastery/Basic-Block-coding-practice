import React from 'react';
import OrderingLevel from '../components/OrderingLevel';

export default function Level5({ onPass }: { onPass: () => void }) {
  const items = [
    { id: 'turtle', name: 'เต่า', emoji: '🐢' },
    { id: 'dog', name: 'สุนัข', emoji: '🐕' },
    { id: 'cheetah', name: 'ชีตาห์', emoji: '🐆' },
  ];
  return <OrderingLevel items={items} correctOrder={['cheetah', 'dog', 'turtle']} onPass={onPass} label="เรียงจากเร็วที่สุด ไป ช้าที่สุด" />;
}
