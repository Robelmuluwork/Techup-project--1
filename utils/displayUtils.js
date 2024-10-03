/**
 * Foramt time in seconds
 *
 *
 * @param {number}  seconds number of seconds to format
 * @returns {string} formatted time as mm:ss
 *
 * */

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

/**
 * displays the remaining time in terminal
 * @param {number} remainingTime remaining time in seconds
 * @param {boolean} isWorkInterval flag indicating whether it's a work interval
 * @returns {void}
 * */

function displayTime(remainingTime, isWorkInterval) {
  console.clear();
  const intervalType = isWorkInterval ? "Work" : "Break";
  console.log(`pomodoro timer - $(intervalType) interval`);

  console.log(`Time remaining:$(formatTime(remainingtime))`);
}

module.exports = {
  formatTime,
  displayTime,
};
