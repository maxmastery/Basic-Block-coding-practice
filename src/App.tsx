/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Landing from './Landing';
import Home from './Home';
import LevelContainer from './components/LevelContainer';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';
import Level5 from './levels/Level5';
import Level6 from './levels/Level6';
import Level7 from './levels/Level7';
import Level8 from './levels/Level8';
import Level9 from './levels/Level9';
import Level10 from './levels/Level10';
import { levels } from './data/levels';
import { audio } from './utils/audio';

const LevelComponents: Record<number, React.FC<{ onPass: () => void }>> = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4,
  5: Level5,
  6: Level6,
  7: Level7,
  8: Level8,
  9: Level9,
  10: Level10,
};

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [isPassed, setIsPassed] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handlePass = () => {
    audio.playSuccess();
    setIsPassed(true);
  };

  const handleNext = () => {
    if (currentLevelId && currentLevelId < 10) {
      setCurrentLevelId(currentLevelId + 1);
      setIsPassed(false);
      setResetKey(k => k + 1);
    }
  };

  const handleHome = () => {
    setCurrentLevelId(null);
    setIsPassed(false);
  };

  const handleReset = () => {
    setResetKey(k => k + 1);
    setIsPassed(false);
  };

  if (!hasStarted) {
    return <Landing onStart={handleStart} />;
  }

  if (currentLevelId === null) {
    return <Home onSelectLevel={(id) => { setCurrentLevelId(id); setIsPassed(false); setResetKey(k => k + 1); }} />;
  }

  const levelData = levels.find(l => l.id === currentLevelId);
  const LevelComponent = LevelComponents[currentLevelId];

  return (
    <LevelContainer
      level={currentLevelId}
      title={levelData?.title || ''}
      onHome={handleHome}
      onNext={handleNext}
      isPassed={isPassed}
      onReset={handleReset}
    >
      {LevelComponent && <LevelComponent key={resetKey} onPass={handlePass} />}
    </LevelContainer>
  );
}

