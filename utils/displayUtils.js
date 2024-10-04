/**
 * Format time in seconds
 *
 * @param {number} seconds Number of seconds to format
 * @returns {string} Formatted time as mm:ss
 */
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

/**
 * Displays the remaining time in the terminal
 * @param {number} remainingTime Remaining time in seconds
 * @param {boolean} isWorkInterval Flag indicating whether it's a work interval
 * @returns {void}
 */
function displayTime(
  remainingTime,
  isWorkInterval,
  totalWorkTime,
  totalBreakTime,
  intervalCount
) {
  console.clear();
  const intervalType = isWorkInterval ? "Work" : "Break";
  console.log(`Pomodoro Timer - ${intervalType} interval`);
  console.log(`Time Remaining: ${formatTime(remainingTime)}`);
  console.log(`Total Work Time: ${totalWorkTime / 60} minutes`);
  console.log(`Total Break Time: ${totalBreakTime / 60} minutes`);
  console.log(`Intervals Completed: ${intervalCount}`);
}

module.exports = {
  formatTime,
  displayTime,
};
