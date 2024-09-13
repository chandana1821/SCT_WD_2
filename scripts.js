let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lastLapTime = 0;
let lapCounter = 0;  // Add a lap counter

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapTimes = document.getElementById('lapTimes');
const body = document.body; // Reference to the body for lighting effect

// Function to format time into HH:MM:SS
function formatTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds
  );
}

// Function to update the display
function updateDisplay() {
  const currentTime = Date.now();
  const timeElapsed = currentTime - startTime + elapsedTime;
  display.textContent = formatTime(timeElapsed);
}

// Start or pause the stopwatch
startPauseBtn.addEventListener('click', function () {
  if (!running) {
    startTime = Date.now(); // Set the current time as start time
    timerInterval = setInterval(updateDisplay, 1000); // Update every second
    running = true;
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.remove('start');
    startPauseBtn.classList.add('pause');
    resetBtn.disabled = false;
    lapBtn.disabled = false;

    // Apply lighting effect when the timer starts
    body.classList.add('timer-lit');
    display.classList.add('display-lit');
  } else {
    clearInterval(timerInterval); // Stop the interval
    elapsedTime += Date.now() - startTime; // Add the elapsed time
    running = false;
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.remove('pause');
    startPauseBtn.classList.add('start');
  }
});

// Reset the stopwatch
resetBtn.addEventListener('click', function () {
  clearInterval(timerInterval);
  running = false;
  startTime = 0;
  elapsedTime = 0; // Reset elapsed time
  lastLapTime = 0; // Reset the last lap time
  lapCounter = 0;  // Reset lap counter
  display.textContent = '00:00:00'; // Reset display to initial state
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('pause');
  startPauseBtn.classList.add('start');
  lapTimes.innerHTML = ''; // Clear lap times
  resetBtn.disabled = true;
  lapBtn.disabled = true;

  // Remove lighting effect when the timer is reset
  body.classList.remove('timer-lit');
  display.classList.remove('display-lit');
});

// Record a lap
lapBtn.addEventListener('click', function () {
  if (running) {
    lapCounter++;  // Increment the lap counter
    const currentTime = Date.now();
    const totalTime = currentTime - startTime + elapsedTime;
    const lapTime = timerInterval+ currentTime -startTime;  // Lap time is the difference between total elapsed time and last lap
    lastLapTime = totalTime;  // Update the last lap time to current total time

    const li = document.createElement('li');
    li.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;  // Display lap count and lap time
    lapTimes.appendChild(li);
  }
});

// Initialize the display on page load
display.textContent = '00:00:00';
resetBtn.disabled = true;
lapBtn.disabled = true;
