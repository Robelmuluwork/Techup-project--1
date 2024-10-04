const fs = require("fs");

let sessionHistory = [];

/**
 * Saves the current session history (total work time, total break time, intervals completed) to a JSON file.
 *
 * @param {number} totalWorkTime Total work time in seconds.
 * @param {number} totalBreakTime Total break time in seconds.
 * @param {number} intervalCount Number of intervals completed.
 * @returns {void}
 */
function saveSessionHistory(totalWorkTime, totalBreakTime, intervalCount) {
  const sessionData = {
    totalWorkTime,
    totalBreakTime,
    intervalsCompleted: intervalCount,
    date: new Date(),
  };
  sessionHistory.push(sessionData);
  fs.writeFileSync(
    "session_history.json",
    JSON.stringify(sessionHistory, null, 2)
  );
  console.log("Session history saved.");
}

/**
 * Loads the session history from a JSON file if it exists.
 *
 * @returns {void}
 */
function loadSessionHistory() {
  if (fs.existsSync("session_history.json")) {
    const data = fs.readFileSync("session_history.json");
    sessionHistory = JSON.parse(data);
    console.log("Session history loaded.");
  }
}

// Export the functions
module.exports = {
  saveSessionHistory,
  loadSessionHistory,
};
