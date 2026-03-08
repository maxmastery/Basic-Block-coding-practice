class AudioEngine {
  ctx: AudioContext | null = null;
  bgmOscillators: OscillatorNode[] = [];
  bgmGain: GainNode | null = null;
  isPlayingBgm: boolean = false;
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBgm() {
    this.init();
    if (!this.ctx || this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.02; // Low volume for BGM
    this.bgmGain.connect(this.ctx.destination);

    // Simple happy chord progression arpeggio
    const notes = [
      261.63, // C4
      329.63, // E4
      392.00, // G4
      523.25, // C5
      392.00, // G4
      329.63, // E4
      
      349.23, // F4
      440.00, // A4
      523.25, // C5
      698.46, // F5
      523.25, // C5
      440.00, // A4
      
      392.00, // G4
      493.88, // B4
      587.33, // D5
      783.99, // G5
      587.33, // D5
      493.88, // B4
    ];

    let startTime = this.ctx.currentTime;
    const noteLength = 0.2;

    // Schedule a long sequence
    for (let i = 0; i < 1000; i++) {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = notes[i % notes.length];
      
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, startTime + i * noteLength);
      noteGain.gain.linearRampToValueAtTime(1, startTime + i * noteLength + 0.05);
      noteGain.gain.linearRampToValueAtTime(0, startTime + i * noteLength + noteLength - 0.01);
      
      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);
      
      osc.start(startTime + i * noteLength);
      osc.stop(startTime + i * noteLength + noteLength);
      
      this.bgmOscillators.push(osc);
    }
  }

  stopBgm() {
    if (!this.isPlayingBgm) return;
    this.bgmOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.bgmOscillators = [];
    if (this.bgmGain) {
      this.bgmGain.disconnect();
      this.bgmGain = null;
    }
    this.isPlayingBgm = false;
  }

  playClick() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playSuccess() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.1);
    osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playError() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.setValueAtTime(150, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

export const audio = new AudioEngine();
