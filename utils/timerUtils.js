//hard coded values for work duration, short break duration, and long break duration
let workDuration = 1 * 60; // 25 minutes in seconds
let shortBreakDuration = 1 * 60; // 5 minutes in seconds
let longBreakDuration = 2 * 60; // 15 minutes in seconds

//variables initialized to track the timer
let intervalCount = 0;
let totalWorkTime = 0;
let totalBreakTime = 0;

let remainingTime = workDuration; //time starts with work duration
let timer; //to store the interval ID

//variables initialized to track the timer toggle state
let isWorkInterval = true; // to keep track of work or break cycle
let isRunning = false; // to track if the timer is runnig

/**
 * Displays the current time remaining on the timer.
 *
 * @returns {void}
 */
function displayTime() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  console.clear(); // Clear the console to show the updated time
  console.log(`Time Remaining: ${timeString}`);

  console.log(
    isWorkInterval ? "Current Interval: Work" : "Current Interval: Break"
  );

  console.log(`Total Work Time: ${totalWorkTime / 60} minutes`);

  console.log(`Total Break Time: ${totalBreakTime / 60} minutes`);

  console.log(`Intervals Completed: ${intervalCount}`);
}

/**
 * starts the countdown timer for the current interval
 *
 * @returns {void}
 */
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    remainingTime--;
    displayTime();

    if (remainingTime <= 0) {
      clearInterval(timer);
      isRunning = false;
      switchInterval();
      startTimer(); //automatically start the next interval
    }
  }, 1000);
}

/**
 * pause the coutdown timer
 * @returns {void}
 */
function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  console.log("Timer paused");
}

/**
 * resets the timer and all intervals
 *
 * @returns {void}
 */
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = workDuration;
  intervalCount = 0;
  console.log("Timer reset");
  displayTime();
}

/**
 * switches between work and break intervals and resets the timer duratin
 *
 * @returns {void}
 */
function switchInterval() {
  if (isWorkInterval) {
    totalWorkTime += workDuration;
    console.log("work interval completed 👏! taking short break 😩😪🥱😴 ");
    intervalCount++;
    remainingTime =
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;
  } else {
    totalBreakTime +=
      intervalCount % 4 === 0 ? longBreakDuration : shortBreakDuration;
    console.log("short break is over 🥳! back to work 💼💻💯");
  }
  isWorkInterval = !isWorkInterval; //toggle work and break interval
  displayTime();
}

/**
 * handles usert input commands for startting, pausing,resetting, and showing status
 *
 * @param {string} command entered by the user
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
      displayTime();
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
      console.log("unknown commands. type 'help' for a list of commands");
  }
}

module.exports = {
  startTimer,
  pauseTimer,
  resetTimer,
  handleUserInput,
};
