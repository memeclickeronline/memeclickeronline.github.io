let aura = 0;
const scoreEl = document.getElementById("score");

let sevenCount = 0;
let boomerCount = 0;
let genZCount = 0;

let sevenCost = 1;
let boomerCost = 2;
let genZCost = 3;

const sevenBtn = document.getElementById("sevenBtn");
const boomerBtn = document.getElementById("boomerBtn");
const genZBtn = document.getElementById("genZBtn");
const sevenCostEl = document.getElementById("sevenCost");
const boomerCostEl = document.getElementById("boomerCost");
const genZCostEl = document.getElementById("genZCost");
const clickBtn = document.getElementById("clickBtn");

let lastClickTime = 0;
const clickCooldown = 300;

clickBtn.addEventListener("click", () => {
  const now = Date.now();
  if (now - lastClickTime >= clickCooldown) {
    aura += 1;
    updateScore();
    lastClickTime = now;
  }
});

function buyUpgrade(type) {
  if (type === "seven" && aura >= sevenCost) {
    aura -= sevenCost;
    sevenCount++;
    sevenCost = Math.ceil(sevenCost * 1.25);
    sevenCostEl.textContent = sevenCost;
  } else if (type === "boomer" && aura >= boomerCost) {
    aura -= boomerCost;
    boomerCount++;
    boomerCost = Math.ceil(boomerCost * 1.25);
    boomerCostEl.textContent = boomerCost;
  } else if (type === "genZ" && aura >= genZCost) {
    aura -= genZCost;
    genZCount++;
    genZCost = Math.ceil(genZCost * 1.25);
    genZCostEl.textContent = genZCost;
  }
  updateScore();
}

sevenBtn.addEventListener("click", () => buyUpgrade("seven"));
boomerBtn.addEventListener("click", () => buyUpgrade("boomer"));
genZBtn.addEventListener("click", () => buyUpgrade("genZ"));

// ===== Auto clickers =====
// 7yo every 5s
setInterval(() => {
  aura += sevenCount;
  updateScore();
}, 5000);

// Boomer every 3s
setInterval(() => {
  aura += boomerCount;
  updateScore();
}, 3000);

// GenZ every 5s
setInterval(() => {
  for (let i = 0; i < genZCount; i++) {
    if (Math.random() < 0.5) {
      aura += 5;
    } else {
      aura -= 5;
      if (aura < 0) aura = 0;
    }
  }
  updateScore();
}, 5000);

function updateScore() {
  scoreEl.textContent = "Aura: " + aura;
}
