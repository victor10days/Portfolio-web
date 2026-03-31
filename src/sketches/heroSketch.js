const heroSketch = (p) => {
  let particles = [];
  const PARTICLE_COUNT = 120;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(2, 6),
        speed: p.random(0.3, 1.2),
        noiseOffset: p.random(1000),
      });
    }
  };

  p.draw = () => {
    p.background(26, 26, 26);
    const time = p.frameCount * 0.005;

    for (let x = 0; x < p.width; x += 30) {
      for (let y = 0; y < p.height; y += 30) {
        const angle = p.noise(x * 0.003, y * 0.003, time) * p.TWO_PI * 2;
        const brightness = p.noise(x * 0.005, y * 0.005, time * 0.5);
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.fill(232, 85, 58, brightness * 30);
        p.rect(0, 0, 20, 1);
        p.pop();
      }
    }

    for (const particle of particles) {
      const angle = p.noise(
        particle.x * 0.003,
        particle.y * 0.003,
        time
      ) * p.TWO_PI * 2;

      particle.x += p.cos(angle) * particle.speed;
      particle.y += p.sin(angle) * particle.speed;

      if (particle.x < 0) particle.x = p.width;
      if (particle.x > p.width) particle.x = 0;
      if (particle.y < 0) particle.y = p.height;
      if (particle.y > p.height) particle.y = 0;

      const alpha = p.map(particle.size, 2, 6, 40, 120);
      p.fill(224, 224, 224, alpha);
      p.ellipse(particle.x, particle.y, particle.size);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default heroSketch;
