let stopwatchInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateTimeDisplay, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(stopwatchInterval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    updateTimeDisplay();
    lapCount = 1;
    clearLapTimes();
    isRunning = false;
}

function updateTimeDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('time').innerText = formattedTime;
}

function formatTime(time) {
    const milliseconds = Math.floor(time % 1000 / 10);
    const seconds = Math.floor(time / 1000 % 60);
    const minutes = Math.floor(time / (1000 * 60) % 60);
    return `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}:${formatTimeUnit(milliseconds)}`;
}

function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
        document.getElementById('lap-times').appendChild(lapItem);
        lapCount++;
    }
}

function clearLapTimes() {
    document.getElementById('lap-times').innerHTML = '';
}
