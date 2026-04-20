const SIZE = 21;

let grid = [];
let wordMap = [];
let showAnswers = true;

/* ------------------- PARSE ------------------- */
function parseList(text) {
  return text
    .split("\n")
    .map(l => l.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
}

/* ------------------- GENERATE ------------------- */
function generate() {
  const title = document.getElementById("titleInput").value;

  const wordsRaw = parseList(document.getElementById("wordsInput").value);
  const cluesRaw = parseList(document.getElementById("cluesInput").value);

  if (!wordsRaw.length) return;

  const words = wordsRaw.map((w, i) => ({
    word: w.toUpperCase(),
    clue: cluesRaw[i] || "Fără întrebare",
    index: i + 1
  }));

  document.getElementById("titleOut").innerText = title;

  grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  wordMap = [];

  placeFirst(words[0]);

  for (let i = 1; i < words.length; i++) {
    placeWord(words[i]);
  }

  render(words);
}

/* ------------------- FIRST WORD ------------------- */
function placeFirst(w) {
  const row = 7;
  const col = Math.floor((SIZE - w.word.length) / 2);

  wordMap.push({ ...w, row, col, dir: "H" });

  for (let i = 0; i < w.word.length; i++) {
    grid[row][col + i] = w.word[i];
  }
}

/* ------------------- WORD PLACEMENT (INTELLIGENT) ------------------- */
function placeWord(w) {
  let best = null;

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {

      if (!grid[r][c]) continue;

      for (let i = 0; i < w.word.length; i++) {

        if (grid[r][c] !== w.word[i]) continue;

        const h = evaluateH(w.word, r, c - i);
        if (h) {
          if (!best || h.score > best.score) {
            best = { ...h, type: "H", word: w };
          }
        }

        const v = evaluateV(w.word, r - i, c);
        if (v) {
          if (!best || v.score > best.score) {
            best = { ...v, type: "V", word: w };
          }
        }
      }
    }
  }

  if (best) {
    if (best.type === "H") putH(best.word, best.r, best.c);
    else putV(best.word, best.r, best.c);
  }
}

/* ------------------- VALIDARE H + SCOR ------------------- */
function evaluateH(word, r, c) {
  if (c < 0 || c + word.length > SIZE) return null;

  let intersections = 0;

  for (let i = 0; i < word.length; i++) {
    const cell = grid[r][c + i];

    if (cell) {
      if (cell !== word[i]) return null;
      intersections++;
    }
  }

  if (intersections === 0) return null;

  return { r, c, score: intersections };
}

/* ------------------- VALIDARE V + SCOR ------------------- */
function evaluateV(word, r, c) {
  if (r < 0 || r + word.length > SIZE) return null;

  let intersections = 0;

  for (let i = 0; i < word.length; i++) {
    const cell = grid[r + i][c];

    if (cell) {
      if (cell !== word[i]) return null;
      intersections++;
    }
  }

  if (intersections === 0) return null;

  return { r, c, score: intersections };
}

/* ------------------- PUT H ------------------- */
function putH(w, r, c) {
  wordMap.push({ ...w, row: r, col: c, dir: "H" });

  for (let i = 0; i < w.word.length; i++) {
    grid[r][c + i] = w.word[i];
  }
}

/* ------------------- PUT V ------------------- */
function putV(w, r, c) {
  wordMap.push({ ...w, row: r, col: c, dir: "V" });

  for (let i = 0; i < w.word.length; i++) {
    grid[r + i][c] = w.word[i];
  }
}

/* ------------------- RENDER ------------------- */
function render(words) {
  const gridEl = document.getElementById("grid");
  const qEl = document.getElementById("questions");

  gridEl.innerHTML = "";
  qEl.innerHTML = "";

  let numbering = {};

  wordMap.forEach((w, idx) => {
    numbering[`${w.row}-${w.col}`] = idx + 1;
  });

  /* GRID */
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {

      const div = document.createElement("div");
      div.className = "cell";

      if (grid[r][c]) {

        let letter = grid[r][c];
        if (!showAnswers) letter = "";

        if (numbering[`${r}-${c}`]) {
          div.textContent = numbering[`${r}-${c}`] + letter;
        } else {
          div.textContent = letter;
        }

      } else {
        div.textContent = "";
      }

      gridEl.appendChild(div);
    }
  }

  /* QUESTIONS */
  words.forEach(w => {
    const div = document.createElement("div");
    div.innerHTML = `<b>${w.index}.</b> ${w.clue}`;
    qEl.appendChild(div);
  });
}

/* ------------------- TOGGLE ------------------- */
function toggleAnswers() {
  showAnswers = !showAnswers;
  generate();
}