// ===== Aura & Score =====
let aura = 0;
const scoreEl = document.getElementById("score");

// ===== Upgrade variables =====
let sevenCount = 0;
let boomerCount = 0;
let genZCount = 0;

let sevenCost = 1;
let boomerCost = 2;
let genZCost = 3;

// ===== DOM Elements =====
const sevenBtn = document.getElementById("sevenBtn");
const boomerBtn = document.getElementById("boomerBtn");
const genZBtn = document.getElementById("genZBtn");
const sevenCostEl = document.getElementById("sevenCost");
const boomerCostEl = document.getElementById("boomerCost");
const genZCostEl = document.getElementById("genZCost");
const clickBtn = document.getElementById("clickBtn");

// ===== Click cooldown =====
let lastClickTime = 0; // stores last click time
const clickCooldown = 300; // milliseconds (0.3 seconds)

clickBtn.addEventListener("click", () => {
  const now = Date.now(); // current time
  if (now - lastClickTime >= clickCooldown) {
    aura += 1; // add 1 Aura per valid click
    updateScore(); // update display
    lastClickTime = now; // reset last click time
  }
});


// ===== Upgrade Purchase Functions =====
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

// ===== Auto Clicker Logic =====
setInterval(() => {
  aura += sevenCount * 1; // 7yo every 5s → handled by interval below
}, 1000); // running every 1s for simplicity

setInterval(() => {
  aura += boomerCount * 1; // Boomer every 3s → handled below
}, 1000);

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

// ===== Timer-based intervals for actual upgrade speeds =====
setInterval(() => {
  aura += sevenCount; // 7yo triggers every 5s
  updateScore();
}, 5000);

setInterval(() => {
  aura += boomerCount; // Boomer triggers every 3s
  updateScore();
}, 3000);

// ===== Update Score Display =====
function updateScore() {
  scoreEl.textContent = "Aura: " + aura;
}
