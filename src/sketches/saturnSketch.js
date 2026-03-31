const saturnSketch = (p) => {
  let counter = 100;
  const CHAOS_RADIUS = 400;
  const CHAOS_RADIUS_SQ = CHAOS_RADIUS * CHAOS_RADIUS;
  const CHAOS_STRENGTH = 200;

  // Global mouse tracking (p.mouseX/Y don't update when canvas is behind content)
  let globalMouseX = 0;
  let globalMouseY = 0;

  // Warm palette for depth and atmosphere
  const CORE_COLOR = [255, 240, 220];
  const RING1_COLOR = [220, 200, 180];
  const RING2_COLOR = [200, 190, 210];

  // --- Granular synthesis engine ---
  let audioCtx = null;
  let masterGain = null;
  let grainCount = 0;
  const MAX_GRAINS = 6;
  const GRAIN_INTERVAL = 400;
  let lastGrainTime = 0;
  let chaosIntensity = 0;
  let audioEnabled = false;
  let audioBtn = null;

  // Lower, warmer pentatonic — soothing register
  const SCALE = [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66];

  function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.25;

    // Limiter to prevent any clipping
    const compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 12;
    compressor.ratio.value = 8;
    compressor.attack.value = 0.005;
    compressor.release.value = 0.25;

    masterGain.connect(compressor);
    compressor.connect(audioCtx.destination);
  }

  function spawnGrain(intensity, cursorY, height) {
    if (!audioCtx || grainCount >= MAX_GRAINS) return;
    const now = audioCtx.currentTime;

    const yNorm = 1 - cursorY / height;
    const scaleIdx = Math.floor(yNorm * (SCALE.length - 1));
    const baseFreq = SCALE[Math.min(scaleIdx, SCALE.length - 1)];

    // Long, drifting grains
    const duration = 2.5 + (1 - intensity) * 3.0;
    const fadeIn = duration * 0.4;
    const fadeOut = duration * 0.5;

    // Two detuned oscillators for airy chorus
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'triangle';
    osc1.frequency.value = baseFreq;
    osc2.frequency.value = baseFreq * 1.002;

    // Slow vibrato
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.type = 'triangle';
    lfo.frequency.value = 0.06 + Math.random() * 0.08;
    lfoGain.gain.value = 0.8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    // Airy bandpass
    filter.type = 'bandpass';
    filter.frequency.value = baseFreq * 1.5;
    filter.Q.value = 0.25;

    // linearRamp for completely smooth, clickless envelope
    const peakVol = 0.008 + intensity * 0.012;
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.linearRampToValueAtTime(peakVol, now + fadeIn);
    oscGain.gain.linearRampToValueAtTime(0.0001, now + fadeIn + fadeOut);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    lfo.stop(now + duration);

    grainCount++;
    osc1.onended = () => { grainCount--; };
  }

  function toggleAudio() {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    audioEnabled = !audioEnabled;
    if (masterGain) masterGain.gain.linearRampToValueAtTime(audioEnabled ? 0.25 : 0.0001, audioCtx.currentTime + 0.1);
    if (audioBtn) {
      audioBtn.innerHTML = audioEnabled ? '&#9835; ON' : '&#9835; OFF';
      audioBtn.style.color = audioEnabled ? '#E0E0E0' : '#999';
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();
    p.strokeCap(p.ROUND);
    p.frameRate(30);

    // Audio toggle button — appended to body so it sits above all layers
    audioBtn = document.createElement('button');
    audioBtn.innerHTML = '&#9835; OFF';
    Object.assign(audioBtn.style, {
      position: 'fixed', bottom: '20px', right: '20px', zIndex: '999',
      padding: '8px 14px', fontFamily: 'Georgia, serif', fontSize: '13px',
      color: '#999', background: 'rgba(26, 26, 26, 0.85)', border: '1px solid #242424',
      cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s', userSelect: 'none',
    });
    audioBtn.addEventListener('click', toggleAudio);
    audioBtn.addEventListener('mouseenter', () => { audioBtn.style.color = '#E8553A'; audioBtn.style.borderColor = '#E8553A'; });
    audioBtn.addEventListener('mouseleave', () => { audioBtn.style.color = audioEnabled ? '#E0E0E0' : '#999'; audioBtn.style.borderColor = '#242424'; });
    document.body.appendChild(audioBtn);

    // Track mouse globally since canvas is behind content layers
    document.addEventListener('mousemove', (e) => { globalMouseX = e.clientX; globalMouseY = e.clientY; });
    document.addEventListener('touchmove', (e) => { globalMouseX = e.touches[0].clientX; globalMouseY = e.touches[0].clientY; }, { passive: true });
  };

  p.draw = () => {
    p.background(28, 28, 28);
    counter += 0.003;

    const cx = p.width / 2;
    const cy = p.height / 2;
    const mx = globalMouseX;
    const my = globalMouseY;
    const time = counter * 0.5;

    let rx, ry, dx, dy, distSq, dist, t, chaos, nx, ny;
    let chaosCount = 0;
    let maxChaosT = 0;

    // Global scale and Perlin drift
    const SCALE_UP = 1.8;
    const DRIFT = 45;

    // --- Planet body ---
    p.stroke(CORE_COLOR[0], CORE_COLOR[1], CORE_COLOR[2]);
    for (let i = 6000; i >= 0; i -= 4) {
      const radialOffset = counter / p.cos(counter / i);
      const angularPhase = counter / 9 + i * i;
      const sinAng = p.sin(angularPhase);
      const cosAng = p.cos(angularPhase);

      rx = cx + radialOffset * 1.3 * SCALE_UP * sinAng * p.sin(i / counter);
      ry = cy + radialOffset * SCALE_UP * cosAng;
      const size = 1 - cosAng;

      // Global Perlin drift — every particle breathes
      nx = (p.noise(rx * 0.002, ry * 0.002, time) - 0.5) * 2 * DRIFT;
      ny = (p.noise(rx * 0.002 + 300, ry * 0.002 + 300, time) - 0.5) * 2 * DRIFT;
      rx += nx;
      ry += ny;

      dx = rx - mx;
      dy = ry - my;
      distSq = dx * dx + dy * dy;
      if (distSq < CHAOS_RADIUS_SQ && distSq > 0) {
        dist = Math.sqrt(distSq);
        t = 1 - dist / CHAOS_RADIUS;
        chaos = t * t * CHAOS_STRENGTH;
        rx += (p.noise(i * 0.01, time) - 0.5) * 2 * chaos;
        ry += (p.noise(i * 0.01 + 50, time) - 0.5) * 2 * chaos;
        chaosCount++;
        if (t > maxChaosT) maxChaosT = t;
      }

      p.strokeWeight(size * 1.2);
      p.point(rx, ry);
    }

    // --- Ring 1 ---
    p.stroke(RING1_COLOR[0], RING1_COLOR[1], RING1_COLOR[2]);
    for (let i = 6999; i > 0; i -= 8) {
      const radialOffset = counter / p.cos(counter / i) + (counter / 2 + i % counter);
      const angularPhase = counter / 9 + i * i;
      const sinAng = p.sin(angularPhase);
      const cosAng = p.cos(angularPhase);

      rx = cx + radialOffset * 1.3 * SCALE_UP * sinAng * p.sin(i / counter);
      ry = cy + radialOffset * SCALE_UP * cosAng;
      const size = 1 - cosAng;

      nx = (p.noise(rx * 0.002, ry * 0.002, time) - 0.5) * 2 * DRIFT;
      ny = (p.noise(rx * 0.002 + 300, ry * 0.002 + 300, time) - 0.5) * 2 * DRIFT;
      rx += nx;
      ry += ny;

      dx = rx - mx;
      dy = ry - my;
      distSq = dx * dx + dy * dy;
      if (distSq < CHAOS_RADIUS_SQ && distSq > 0) {
        dist = Math.sqrt(distSq);
        t = 1 - dist / CHAOS_RADIUS;
        chaos = t * t * CHAOS_STRENGTH;
        rx += (p.noise(i * 0.02, time) - 0.5) * 2 * chaos;
        ry += (p.noise(i * 0.02 + 50, time) - 0.5) * 2 * chaos;
        chaosCount++;
        if (t > maxChaosT) maxChaosT = t;
      }

      p.strokeWeight(size);
      p.point(rx, ry);
    }

    // --- Ring 2 ---
    p.stroke(RING2_COLOR[0], RING2_COLOR[1], RING2_COLOR[2]);
    for (let i = 6999; i > 0; i -= 4) {
      const radialOffset = counter / p.cos(counter / i) + (counter / 2 + i % counter) * 1.4;
      const angularPhase = counter / 3 + i * i;
      const sinAng = p.sin(angularPhase);

      rx = cx + radialOffset * 1.3 * SCALE_UP * sinAng * p.sin(i / counter * 0.3);
      ry = cy + radialOffset * SCALE_UP * p.cos(angularPhase + 9);
      const size = (1 - sinAng) * 0.9;

      nx = (p.noise(rx * 0.002, ry * 0.002, time) - 0.5) * 2 * DRIFT;
      ny = (p.noise(rx * 0.002 + 300, ry * 0.002 + 300, time) - 0.5) * 2 * DRIFT;
      rx += nx;
      ry += ny;

      dx = rx - mx;
      dy = ry - my;
      distSq = dx * dx + dy * dy;
      if (distSq < CHAOS_RADIUS_SQ && distSq > 0) {
        dist = Math.sqrt(distSq);
        t = 1 - dist / CHAOS_RADIUS;
        chaos = t * t * CHAOS_STRENGTH;
        rx += (p.noise(i * 0.015, time) - 0.5) * 2 * chaos;
        ry += (p.noise(i * 0.015 + 50, time) - 0.5) * 2 * chaos;
        chaosCount++;
        if (t > maxChaosT) maxChaosT = t;
      }

      p.strokeWeight(size * 0.9);
      p.point(rx, ry);
    }

    // --- Granular audio driven by chaos ---
    chaosIntensity = chaosIntensity * 0.9 + maxChaosT * 0.1;
    if (audioEnabled && audioCtx && chaosCount > 0 && chaosIntensity > 0.08) {
      const now = performance.now();
      if (now - lastGrainTime > GRAIN_INTERVAL) {
        spawnGrain(chaosIntensity, my, p.height);
        lastGrainTime = now;
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default saturnSketch;
