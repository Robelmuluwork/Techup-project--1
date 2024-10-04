# Pomodoro Timer CLI

A simple Pomodoro timer implemented in JavaScript that helps manage your work and break intervals based on the Pomodoro Technique. This project allows users to track their total work and break time while providing session history.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [Session History](#session-history)


## Features

- Track work and break intervals.
- View total work time and total break time.
- Save session history in a JSON file.
- Simple command-line interface for user interaction.

## Technologies Used

- JavaScript (Node.js)
- File System (fs) module for saving session history.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Robelmuluwork/Techup-project--1
   ````
Navigate to the project directory:
         
   ````bash
   cd Techup-project--1
   ````

## USAGE
1.Start the timer by running the application:
   ````bash
   node src/app.js

   ````
2.Enter commands to control the timer and view information.
    
## Commands
   -**start:** Start the timer
   
   -**pause:** Pause the timer.
   
   -**reset:** Reset the timer and intervals.
   
   -**status:** Show the current timer status, including remaining time and total work/break time.
   
   -**help:** Display available commands.
## Session History
   The timer saves session history to a session_history.json file.
   This file contains records of your total work time, total break time, intervals completed, and 
   the date for each session. You can view this file to keep track of your productivity over time.
