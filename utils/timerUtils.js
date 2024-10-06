const { displayTime } = require("./displayUtils");
const { saveSessionHistory } = require("./sessionUtils");
const player = require("play-sound")((opts = {}));
const notifier = require("node-notifier");
const path = require("path");
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
  // Toggle work/break interval and update total times
  if (isWorkInterval) {
    totalWorkTime += workDuration; // Add to total work time
    console.log("Work interval completed 👏! Taking a short break 😩😪🥱😴");

    // Set the next interval as break
    remainingTime =
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;

    // Increment the interval count after a work period ends
    intervalCount++;

    // Play sound and show notification for break start
    player.play("../Sounds/work.wav", (err) => {
      if (err) console.error("Error playing sound:", err);
    });
    notifier.notify({
      title: "Break Time!",
      message: "Time for a break. Relax and recharge!",
      sound: true,
      wait: true,
    });
  } else {
    totalBreakTime +=
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;
    console.log("Break is over 🥳! Back to work 💼💻💯");

    // Set the next interval as work
    remainingTime = workDuration;

    // Play sound and show notification for work start
    player.play(
      path.join(__dirname, "..", "..", "Sounds", "break.wav"),
      (err) => {
        if (err) console.error("Error playing sound:", err);
      }
    );
    notifier.notify({
      title: "Work Time!",
      message: "Break is over. Time to focus!",
      sound: true,
      wait: true,
    });
  }

  // Toggle the work/break interval after completing the current one
  isWorkInterval = !isWorkInterval;

  // Update the display after switching intervals
  displayTimer();

  // Save session history after switching intervals
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
                                      -status: shows the session history
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
