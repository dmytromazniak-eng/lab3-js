// ====== Утиліти для генерації випадкових даних ======
const names = ["Олег", "Ірина", "Дмитро", "Марія", "Андрій", "Назар", "Хуй", "Тарас"];
const statuses = ["OK", "WARN", "FAIL"];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFrom(arr) {
    return arr[randInt(0, arr.length - 1)];
}

function formatTime(d) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

// ====== DOM елементи ======
const intervalInput = document.getElementById("intervalInput");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const tbody = document.getElementById("tbody");
const statusText = document.getElementById("statusText");

// ====== Стан ======
let timerId = null;
let rowCounter = 0;

function setStatus(text) {
    statusText.textContent = "Стан: " + text;
}

function addRow() {
    rowCounter += 1;

    const now = new Date();
    const name = randFrom(names);
    const value = randInt(0, 1000);
    const st = randFrom(statuses);

    const tr = document.createElement("tr");

    const cells = [
        rowCounter,
        formatTime(now),
        name,
        value,
        st
    ];

    for (const c of cells) {
        const td = document.createElement("td");
        td.textContent = c;
        tr.appendChild(td);
    }

    tbody.appendChild(tr);
}

function startGeneration() {
    const ms = Number(intervalInput.value);

    if (!Number.isFinite(ms) || ms < 100) {
        alert("Введіть коректний інтервал (мінімум 100 мс).");
        return;
    }

    stopGeneration(); // чтобы не плодить таймеры

    setStatus(`генерація запущена, інтервал ${ms} мс`);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    // сразу добавим строку, чтобы было видно старт
    addRow();

    timerId = setInterval(addRow, ms);
}

function stopGeneration() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }

    setStatus("зупинено");
    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;
}

function clearTable() {
    tbody.innerHTML = "";
    rowCounter = 0;
    setStatus("таблицю очищено");
}

// ====== Події ======
startBtn.addEventListener("click", startGeneration);
stopBtn.addEventListener("click", stopGeneration);
clearBtn.addEventListener("click", () => {
    stopGeneration();
    clearTable();
});
