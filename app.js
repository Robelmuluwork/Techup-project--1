const readline = require("readline");
const {
  startTimer,
  pauseTimer,
  resetTimer,
  handleUserInput,
} = require("./utils/timerUtils");
const {
  saveSessionHistory,
  loadSessionHistory,
} = require("./utils/sessionUtils");

let totalWorkTime = 0; // Total work time in seconds
let totalBreakTime = 0; // Total break time in seconds
let intervalCount = 0; // Number of intervals completed
const maxIntervals = 2; // Maximum intervals to complete before stopping

// Load session history when the app starts
loadSessionHistory();

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display the current status
function displayStatus() {
  console.log(`\nTime Remaining: ${formatTime()}`);
  console.log(`Current Interval: ${currentIntervalType()}`);
  console.log(`Total Work Time: ${totalWorkTime / 60} minutes`);
  console.log(`Total Break Time: ${totalBreakTime / 60} minutes`);
  console.log(`Intervals Completed: ${intervalCount}`);
}

// Function to finish the Pomodoro session
function finishPomodoroSession() {
  console.log("Session Finished. Saving data...");

  // Save the session history
  saveSessionHistory(totalWorkTime, totalBreakTime, intervalCount);

  // Notify user of completion
  console.log("Pomodoro session completed and saved.");
}

// Function to complete a Pomodoro cycle (25 min work + 5 min break)
function completePomodoroCycle() {
  console.log("\nPomodoro cycle completed.");

  // Add 25 min of work time + 5 min of break time
  totalWorkTime += 1 * 60;
  totalBreakTime += 1 * 60;
  intervalCount++;

  // Save the session after the cycle is complete
  finishPomodoroSession();

  // Check if 2 intervals are completed, then stop the timer
  if (intervalCount <= maxIntervals) {
    console.log(
      `\nCompleted ${maxIntervals} intervals. Stopping Pomodoro Timer.`
    );
    rl.close(); // Close the readline interface to stop asking for input
    process.exit(0); // Optionally exit the program
  }
}

// Function to format time properly (assuming this exists in your utils)
function formatTime() {
  return "00:00"; // Replace with actual time formatting logic
}

// Function to get current interval type (work/break)
function currentIntervalType() {
  return "Work"; // Replace with actual logic to determine current interval
}

// Main loop for handling user input
function main() {
  rl.question(
    "\nEnter a command (start, pause, reset, status, help): ",
    (command) => {
      command = command.trim();
      handleUserInput(command);

      // Check if the timer is completed and finish the session if so
      if (command === "start") {
        startTimer(completePomodoroCycle); // Pass completePomodoroCycle to handle cycle completion
      } else if (command === "pause") {
        pauseTimer();
      } else if (command === "reset") {
        resetTimer();
        finishPomodoroSession(); // Save the session on reset
      } else if (command === "status") {
        displayStatus(); // Show status
      } else if (command === "help") {
        console.log("\nAvailable commands:");
        console.log("start - Start the Pomodoro timer");
        console.log("pause - Pause the Pomodoro timer");
        console.log("reset - Reset the timer and save the session");
        console.log("status - Display the current timer status");
        console.log("help - Show available commands");
      } else {
        console.log(
          "Invalid command. Type 'help' to see the list of commands."
        );
      }

      // Continue asking for user input
      main();
    }
  );
}

// Start the main input loop
main();
