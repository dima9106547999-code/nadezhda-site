const bonus = document.getElementById("bonus");
const salary = document.getElementById("salary");
const tanya = document.getElementById("tanya");
const resultImage = document.getElementById("result-image");

let bonusClickAttempts = 0;
let salaryClickAttempts = 0;
let tanyaClickAttempts = 0;

function setRandomPosition(el) {
  const padding = 20;
  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;

  const rect = el.getBoundingClientRect();
  const maxX = appWidth - rect.width - padding;
  const maxY = appHeight - rect.height - padding;

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  el.style.transform = `translate(${x}px, ${y}px)`;
}

function escapeToRandomSide(el) {
  setRandomPosition(el);
}

function handleBonusAttempt() {
  bonusClickAttempts++;

  if (bonusClickAttempts >= 4) {
    bonus.classList.add("bonus-mutated");
    bonus.textContent = "🤨 Премия";
    bonusClickAttempts = 0;
  }

  escapeToRandomSide(bonus);
}

function handleSalaryAttempt() {
  salaryClickAttempts++;

  if (salaryClickAttempts >= 4) {
    salary.classList.add("salary-hidden");

    // Показать картинку на время "растворения"
    resultImage.hidden = false;

    setTimeout(() => {
      salary.classList.remove("salary-hidden");
      salaryClickAttempts = 0;
      setRandomPosition(salary);

      // Спрятать картинку обратно
      resultImage.hidden = true;
    }, 3000);
  } else {
    escapeToRandomSide(salary);
  }
}

function handleTanyaAttempt() {
  tanyaClickAttempts++;

  if (tanyaClickAttempts >= 3) {
    tanya.textContent = "Таня тут :)";
    tanyaClickAttempts = 0;
  }

  escapeToRandomSide(tanya);
}

// События для мыши и тача
["mousedown", "touchstart"].forEach(evt => {
  bonus.addEventListener(evt, e => {
    e.preventDefault();
    handleBonusAttempt();
    // Таня тоже мелькает
    escapeToRandomSide(tanya);
  });

  salary.addEventListener(evt, e => {
    e.preventDefault();
    handleSalaryAttempt();
    escapeToRandomSide(tanya);
  });

  tanya.addEventListener(evt, e => {
    e.preventDefault();
    handleTanyaAttempt();
  });
});

// Лёгкое "плавание" значков
function gentleDrift(el) {
  const rect = el.getBoundingClientRect();
  const appWidth = window.innerWidth;
  const appHeight = window.innerHeight;

  const padding = 20;
  const maxX = appWidth - rect.width - padding;
  const maxY = appHeight - rect.height - padding;

  const currentTransform = el.style.transform || "translate(0px, 0px)";
  const match = currentTransform.match(/translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/);
  let curX = 0;
  let curY = 0;
  if (match) {
    curX = parseFloat(match[1]);
    curY = parseFloat(match[2]);
  }

  const deltaX = (Math.random() - 0.5) * 40;
  const deltaY = (Math.random() - 0.5) * 40;

  let newX = curX + deltaX;
  let newY = curY + deltaY;

  newX = Math.min(Math.max(padding, newX), maxX);
  newY = Math.min(Math.max(padding, newY), maxY);

  el.style.transform = `translate(${newX}px, ${newY}px)`;
}

setInterval(() => {
  gentleDrift(bonus);
  gentleDrift(salary);
  gentleDrift(tanya);
}, 1500);

// Стартовые позиции
window.addEventListener("load", () => {
  setRandomPosition(bonus);
  setRandomPosition(salary);
  setRandomPosition(tanya);
});

// При изменении размера окна — пересчитать
window.addEventListener("resize", () => {
  setRandomPosition(bonus);
  setRandomPosition(salary);
  setRandomPosition(tanya);
});

