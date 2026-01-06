let clickMultiplier = 1; // base multiplier
let aura = 0;
const score = document.getElementById("score");

// Update UI
function updateScore() {
  score.textContent = "Aura: " + Math.round(aura*100)/100;
}

// Click Button
document.getElementById("clickBtn").addEventListener("click", () => {
  aura += clickMultiplier;
  updateScore();
});

// Upgrades
const upgrades = {
  seven: { count: 0, cost: 1 },
  boomer: { count: 0, cost: 2 },
  genZ: { count: 0, cost: 3 },
  rizz: { count: 0, cost: 50 },
  skibidi: { count: 0, cost: 100 }
};

// Buy Function
function buyUpgrade(name) {
  const up = upgrades[name];
  if (aura >= up.cost) {
    aura -= up.cost;
    up.count++;
    up.cost = Math.ceil(up.cost * 1.25);

    document.getElementById(name + "Cost").textContent = up.cost;
    document.getElementById(name + "Owned").textContent = up.count;

    updateScore();
  }
}

// Upgrade buttons
document.getElementById("sevenBtn").onclick   = () => buyUpgrade("seven");
document.getElementById("boomerBtn").onclick  = () => buyUpgrade("boomer");
document.getElementById("genZBtn").onclick    = () => buyUpgrade("genZ");
document.getElementById("rizzBtn").onclick    = () => buyUpgrade("rizz");
document.getElementById("skibidiBtn").onclick = () => buyUpgrade("skibidi");

// Auto income
setInterval(() => { aura += upgrades.seven.count; updateScore(); }, 5000);
setInterval(() => { aura += upgrades.boomer.count; updateScore(); }, 3000);
setInterval(() => {
  for (let i=0; i<upgrades.genZ.count; i++){
    aura += Math.random()<0.5?5:-5;
    if(aura<0)aura=0;
  }
  updateScore();
}, 5000);
setInterval(() => { aura += upgrades.rizz.count; updateScore(); }, 1000);
setInterval(() => { aura += upgrades.skibidi.count*2; updateScore(); }, 1000);

// Tab switching
const tabs = document.querySelectorAll("#shopTabs .tab");
const panels = document.querySelectorAll(".shopPanel");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t=>t.classList.remove("active"));
    panels.forEach(p=>p.classList.remove("active"));

    tab.classList.add("active");
    const panelId = tab.getAttribute("data-tab");
    document.getElementById(panelId).classList.add("active");
  });
});

// Bombardillo Crocodillo (single purchase 1.1x multiplier)
let bcBought = false;
const bcBtn = document.getElementById("bcBtn");
bcBtn.onclick = () => {
  if (!bcBought && aura >= 10000) {
    aura -= 10000;
    bcBought = true;
    clickMultiplier = 1.1;
    bcBtn.disabled = true;
    bcBtn.textContent = "Bombardillo Crocodillo (Bought)";
    document.getElementById("bcOwned").textContent = 1;
    updateScore();
  }
};
// Bombardillo Crocodillo (single purchase 1.1x multiplier)
let bcBought = false;
const bcBtn = document.getElementById("bcBtn");

bcBtn.onclick = () => {
  if (!bcBought && aura >= 10000) {
    aura -= 10000;        // subtract cost
    bcBought = true;       // mark as bought
    clickMultiplier = 1.1; // apply multiplier
    bcBtn.disabled = true; // disable button
    bcBtn.textContent = "Bombardillo Crocodillo (Bought)";
    updateScore();
  }
};

