const { displayTime } = require("./displayUtils");
const { saveSessionHistory } = require("./sessionUtils");

// Hard coded values for work duration, short break duration, and long break duration
let workDuration = 1 * 60; // 1 minute for testing purposes
let shortBreakDuration = 1 * 60; // 1 minute for testing purposes
let longBreakDuration = 2 * 60; // 2 minutes for testing purposes

// Variables initialized to track the timer
let intervalCount = 0;
let totalWorkTime = 0;
let totalBreakTime = 0;

let remainingTime = workDuration; // Time starts with work duration
let timer; // To store the interval ID

// Variables initialized to track the timer toggle state
let isWorkInterval = true; // To keep track of work or break cycle
let isRunning = false; // To track if the timer is running

/**
 * Displays the current time remaining on the timer.
 *
 * @returns {void}
 */
function displayTimer() {
  displayTime(
    remainingTime,
    isWorkInterval,
    totalWorkTime,
    totalBreakTime,
    intervalCount
  );
}

/**
 * Starts the countdown timer for the current interval
 *
 * @returns {void}
 */
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    remainingTime--;
    displayTimer();

    if (remainingTime <= 0) {
      clearInterval(timer);
      isRunning = false;
      switchInterval();
      startTimer(); // Automatically start the next interval
    }
  }, 1000);
}

/**
 * Pauses the countdown timer
 *
 * @returns {void}
 */
function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  console.log("Timer paused");
}

/**
 * Resets the timer and all intervals
 *
 * @returns {void}
 */
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = workDuration;
  intervalCount = 0;
  console.log("Timer reset");
  displayTimer();
}

/**
 * Switches between work and break intervals and resets the timer duration
 *
 * @returns {void}
 */
function switchInterval() {
  if (isWorkInterval) {
    totalWorkTime += workDuration; // Update total work time
    console.log("Work interval completed 👏! Taking short break 😩😪🥱😴");
    intervalCount++; // Increment the interval count
    remainingTime =
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;
  } else {
    totalBreakTime +=
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;
    console.log("Short break is over 🥳! Back to work 💼💻💯");
  }
  isWorkInterval = !isWorkInterval; // Toggle work and break interval
  displayTimer();

  // Save the session history after each interval switch
  saveSessionHistory(totalWorkTime, totalBreakTime, intervalCount);
}

/**
 * Handles user input commands for starting, pausing, resetting, and showing status
 *
 * @param {string} command Entered by the user
 * @returns {void}
 */
function handleUserInput(command) {
  switch (command.trim()) {
    case "start":
      startTimer();
      break;
    case "pause":
      pauseTimer();
      break;
    case "reset":
      resetTimer();
      break;
    case "status":
      displayTimer();
      break;
    case "help":
      console.log(`Available commands:
                                      -start: start the timer
                                      -pause: pause the timer
                                      -reset: reset the timer
                                      -status: shows the current timer
                                      -help: shows available commands`);
      break;
    default:
      console.log("Unknown command. Type 'help' for a list of commands.");
  }
}

module.exports = {
  startTimer,
  pauseTimer,
  resetTimer,
  handleUserInput,
};
