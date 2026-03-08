import React from 'react';
import OrderingLevel from '../components/OrderingLevel';

export default function Level6({ onPass }: { onPass: () => void }) {
  const items = [
    { id: 'mouse', name: 'หนู', emoji: '🐭' },
    { id: 'cat', name: 'แมว', emoji: '🐱' },
    { id: 'elephant', name: 'ช้าง', emoji: '🐘' },
    { id: 'whale', name: 'วาฬ', emoji: '🐳' },
  ];
  return <OrderingLevel items={items} correctOrder={['whale', 'elephant', 'cat', 'mouse']} onPass={onPass} label="เรียงจากใหญ่ที่สุด ไป เล็กที่สุด" />;
}
