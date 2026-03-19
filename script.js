let score = 0;
let perClick = 1;
let perSecond = 0;
let rebirths = 0;
let multiplier = 1;

const skull = document.getElementById("skull");
const scoreDisplay = document.getElementById("score");
const clickSound = document.getElementById("clickSound");
const rebirthButton = document.getElementById("rebirthButton");

// LOAD SAVE
function loadGame() {
    let save = JSON.parse(localStorage.getItem("save"));
    if (save) {
        score = save.score || 0;
        perClick = save.perClick || 1;
        perSecond = save.perSecond || 0;
        multiplier = save.multiplier || 1;
        rebirths = save.rebirths || 0;
    }
}

// SAVE
function saveGame() {
    localStorage.setItem("save", JSON.stringify({
        score,
        perClick,
        perSecond,
        multiplier,
        rebirths
    }));
}

// FORMAT
function format(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return Math.floor(num);
}

// UPDATE UI
function updateUI() {
    scoreDisplay.innerText =
        `Score: ${format(score)} | Click: ${format(perClick)} | /sec: ${format(perSecond)} | Rebirths: ${rebirths} | x${multiplier}`;

    const rebirthCost = 1000000;
    rebirthButton.innerText = `Rebirth (${format(rebirthCost)})`;
}

// FLOATING TEXT
function createFloatingText(x, y, text) {
    const el = document.createElement("div");
    el.className = "floating";
    el.innerText = text;
    el.style.left = x + "px";
    el.style.top = y + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

// CLICK SKULL
skull.addEventListener("click", (e) => {
    score += perClick * multiplier;

    skull.classList.add("bounce");
    setTimeout(() => {
        skull.classList.remove("bounce");
    }, 100);

    createFloatingText(e.clientX, e.clientY, "+" + format(perClick * multiplier));

    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
    }

    updateUI();
    saveGame();
});

// AUTO INCOME
setInterval(() => {
    score += perSecond;
    updateUI();
    saveGame();
}, 1000);

// REBIRTH
function rebirth() {
    const rebirthCost = 1000000;

    if (score >= rebirthCost) {
        score = 0;
        perClick = 1;
        perSecond = 0;
        rebirths += 1;
        multiplier += 1;

        updateUI();
        saveGame();

        alert("Rebirth complete! Multiplier is now x" + multiplier);
    } else {
        alert("You need 1,000,000 score to rebirth.");
    }
}

rebirthButton.addEventListener("click", rebirth);

// UPGRADES
const clickUpgrades = [
    { name: "+1 Click", value: 1, cost: 10 },
    { name: "+2 Click", value: 2, cost: 50 },
    { name: "+5 Click", value: 5, cost: 150 },
    { name: "+10 Click", value: 10, cost: 500 },
    { name: "+25 Click", value: 25, cost: 1500 },
    { name: "+50 Click", value: 50, cost: 5000 },
    { name: "+100 Click", value: 100, cost: 15000 },
    { name: "+250 Click", value: 250, cost: 50000 },
    { name: "+500 Click", value: 500, cost: 150000 },
    { name: "+1000 Click", value: 1000, cost: 500000 }
];

const autoUpgrades = [
    { name: "+1/sec", value: 1, cost: 25 },
    { name: "+2/sec", value: 2, cost: 100 },
    { name: "+5/sec", value: 5, cost: 300 },
    { name: "+10/sec", value: 10, cost: 1000 },
    { name: "+25/sec", value: 25, cost: 3000 },
    { name: "+50/sec", value: 50, cost: 10000 },
    { name: "+100/sec", value: 100, cost: 30000 },
    { name: "+250/sec", value: 250, cost: 100000 },
    { name: "+500/sec", value: 500, cost: 300000 },
    { name: "+1000/sec", value: 1000, cost: 1000000 }
];

// CREATE BUTTONS
function createButtons() {
    const clickDiv = document.getElementById("clickUpgrades");
    const autoDiv = document.getElementById("autoUpgrades");

    clickDiv.innerHTML = "";
    autoDiv.innerHTML = "";

    clickUpgrades.forEach((upg, i) => {
        let btn = document.createElement("button");
        btn.innerText = `${upg.name} - ${format(upg.cost)}`;
        btn.addEventListener("click", () => buyClick(i, btn));
        clickDiv.appendChild(btn);
    });

    autoUpgrades.forEach((upg, i) => {
        let btn = document.createElement("button");
        btn.innerText = `${upg.name} - ${format(upg.cost)}`;
        btn.addEventListener("click", () => buyAuto(i, btn));
        autoDiv.appendChild(btn);
    });
}

// BUY CLICK
function buyClick(i, btn) {
    let upg = clickUpgrades[i];

    if (score >= upg.cost) {
        score -= upg.cost;
        perClick += upg.value;
        upg.cost = Math.floor(upg.cost * 1.8);
        btn.innerText = `${upg.name} - ${format(upg.cost)}`;
        updateUI();
        saveGame();
    }
}

// BUY AUTO
function buyAuto(i, btn) {
    let upg = autoUpgrades[i];

    if (score >= upg.cost) {
        score -= upg.cost;
        perSecond += upg.value;
        upg.cost = Math.floor(upg.cost * 1.8);
        btn.innerText = `${upg.name} - ${format(upg.cost)}`;
        updateUI();
        saveGame();
    }
}

// START
loadGame();
createButtons();
updateUI();