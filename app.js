const readline = require("readline");
const { handleUserInput } = require("./utils/timerUtils");
const { loadSessionHistory } = require("./utils/sessionUtils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

loadSessionHistory(); // Load previous session history

console.log("Enter a command (start, pause, reset, status, help):");

rl.on("line", (input) => {
  handleUserInput(input);
});
