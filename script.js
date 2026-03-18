let score = 0;
let perClick = 1;
let perSecond = 0;

const skull = document.getElementById("skull");
const scoreDisplay = document.getElementById("score");

// CLICK
skull.addEventListener("click", () => {
    score += perClick;
    skull.classList.add("bounce");

    setTimeout(() => {
        skull.classList.remove("bounce");
    }, 100);

    updateUI();
});

// AUTO INCOME
setInterval(() => {
    score += perSecond;
    updateUI();
}, 1000);

// UPDATE TEXT
function updateUI() {
    scoreDisplay.innerText =
        `Score: ${score} | Click: ${perClick} | /sec: ${perSecond}`;
}

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

    clickUpgrades.forEach((upg, i) => {
        let btn = document.createElement("button");
        btn.innerText = `${upg.name} - ${upg.cost}`;
        btn.onclick = () => buyClick(i, btn);
        clickDiv.appendChild(btn);
    });

    autoUpgrades.forEach((upg, i) => {
        let btn = document.createElement("button");
        btn.innerText = `${upg.name} - ${upg.cost}`;
        btn.onclick = () => buyAuto(i, btn);
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
        btn.innerText = `${upg.name} - ${upg.cost}`;
        updateUI();
    }
}

// BUY AUTO
function buyAuto(i, btn) {
    let upg = autoUpgrades[i];

    if (score >= upg.cost) {
        score -= upg.cost;
        perSecond += upg.value;
        upg.cost = Math.floor(upg.cost * 1.8);
        btn.innerText = `${upg.name} - ${upg.cost}`;
        updateUI();
    }
}

// START
createButtons();
updateUI();