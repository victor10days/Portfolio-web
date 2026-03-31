const aboutSketch = (p) => {
  let cells = [];
  const cellSize = 8;
  let cols, rows;
  let frameSkip = 0;

  const initCells = () => {
    cells = [];
    cols = Math.ceil(p.width / cellSize);
    rows = Math.ceil(p.height / cellSize);
    for (let i = 0; i < cols; i++) {
      cells[i] = [];
      for (let j = 0; j < rows; j++) {
        cells[i][j] = p.random() > 0.85 ? 1 : 0;
      }
    }
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    initCells();
  };

  p.draw = () => {
    p.background(26, 26, 26);
    frameSkip++;
    if (frameSkip % 4 === 0) {
      const next = [];
      for (let i = 0; i < cols; i++) {
        next[i] = [];
        for (let j = 0; j < rows; j++) {
          let neighbors = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = (i + di + cols) % cols;
              const nj = (j + dj + rows) % rows;
              neighbors += cells[ni][nj];
            }
          }
          if (cells[i][j] === 1) {
            next[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
          } else {
            next[i][j] = neighbors === 3 ? 1 : 0;
          }
        }
      }
      cells = next;
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (cells[i][j] === 1) {
          p.fill(232, 85, 58, 50);
          p.rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initCells();
  };
};

export default aboutSketch;
