let totalSeconds = 0;
let maxSeconds = 0;
let timer = null;

const circle = document.querySelector(".progress");
const radius = 140;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

/* PROGRESS */
function setProgress() {
  if (!maxSeconds) return;

  const percent = totalSeconds / maxSeconds;
  circle.style.strokeDashoffset = circumference * (1 - percent);
}

/* DISPLAY */
function updateDisplay() {
  let m = Math.floor(totalSeconds / 60);
  let s = totalSeconds % 60;

  document.getElementById("time").innerText =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");

  setProgress();
}

/* SET TIME */
function setTime(min) {
  totalSeconds = min * 60;
  maxSeconds = totalSeconds;

  updateDisplay();

  const box = document.querySelector(".timerBox");
  box.style.animation = "none";
  void box.offsetWidth;
  box.style.animation = "popIn 0.7s ease";
}

/* PRESET */
function preset(min) {
  pause();
  setTime(min);
}

/* START */
function start() {
  if (timer) return;

  if (totalSeconds === 0) {
    let input = parseInt(document.getElementById("minutes").value);
    if (isNaN(input) || input <= 0) input = 1;
    setTime(input);
  }

  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      document.getElementById("beep").play();
      alert("Timpul a expirat!");
    }
  }, 1000);
}

/* PAUSE */
function pause() {
  clearInterval(timer);
  timer = null;
}

/* RESET */
function reset() {
  pause();
  totalSeconds = maxSeconds;
  updateDisplay();
}

/* EXAM MODE */
function toggleExam() {
  document.body.classList.toggle("exam");
}

/* INIT */
setTime(5);