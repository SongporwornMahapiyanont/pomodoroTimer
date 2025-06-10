let displayTime = document.getElementById("timer");
let modeButtons = document.querySelectorAll(".mode-buttons button");
let controlButtons = document.querySelectorAll(".controls button");

console.log("Script loaded");

let lastMode = "pomodoro"; 
// เริ่มต้นเป็น pomodoro
modeButtons.forEach(function(button) {
  button.addEventListener("click", function (event) {
    let mode = event.target.getAttribute("data-mode");
    lastMode = mode; 
    console.log("Mode selected:", mode);
    startTimer(mode);
  });
});


let time = 25 * 60; // Start with 25 minutes
// Function to start the timer based on the selected mode

function startTimer(mode) {
    // ดึงค่าจาก input
    const customPomodoro = parseInt(document.getElementById('custom-pomodoro').value, 10);
    const customShort = parseInt(document.getElementById('custom-short').value, 10);
    const customLong = parseInt(document.getElementById('custom-long').value, 10);
  
    if (mode === "pomodoro") {
        time = customPomodoro * 60;
        displayTime.textContent = `${String(customPomodoro).padStart(2, '0')}:00`;
    } else if (mode === "short-break") {
        time = customShort * 60;
        displayTime.textContent = `${String(customShort).padStart(2, '0')}:00`;  
    } else if (mode === "long-break") {
        time = customLong * 60;
        displayTime.textContent = `${String(customLong).padStart(2, '0')}:00`;
    } else {
        console.error("Unknown mode:", mode);
        return;
    }  
    updateTimerDisplay(time);
}

updateTimerDisplay = function(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    displayTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Progress Bar
    let total = 1;
    if (lastMode === "pomodoro") {
        total = parseInt(document.getElementById('custom-pomodoro').value, 10) * 60;
    } else if (lastMode === "short-break") {
        total = parseInt(document.getElementById('custom-short').value, 10) * 60;
    } else if (lastMode === "long-break") {
        total = parseInt(document.getElementById('custom-long').value, 10) * 60;
    }
    const percent = 100 - (time / total) * 100;
    document.getElementById('progress-bar').style.width = percent + "%"; // 50%
};

let timerInterval;
controlButtons.forEach(function(button) {
  button.addEventListener("click", function (event) {
    console.log("Control Mode :",event.target.getAttribute("data-control"));

    if( event.target.getAttribute("data-control") === "start") {
      console.log("Timer started");
      startTimer(lastMode); // ดึงค่าจาก input ใหม่ทุกครั้ง
      if (timerInterval) {
          clearInterval(timerInterval);
      }
      timerInterval = setInterval(() => {
          if (time > 0) {
              time--;
              updateTimerDisplay(time);
          } else {
              clearInterval(timerInterval);
              updateTimerDisplay(time);
              alert("Time's up!");
              // auto-switch
              if (lastMode === "pomodoro") {
                  startTimer("short-break");
              } else {
                  startTimer("pomodoro");
              }
          }
      }, 1000); // Update every second
    }

    else if( event.target.getAttribute("data-control") === "pause") {
      console.log("Timer paused");
      clearInterval(timerInterval); // Stop the timer
      
    }
    else if( event.target.getAttribute("data-control") === "reset") {
      console.log("Timer reset");
      startTimer(lastMode); // Reset to the last mode
      clearInterval(timerInterval); // Stop the timer
    }
  });
});

window.onbeforeunload = function (e) {
    e.preventDefault();
    e.returnValue = ''; // Most browsers will show a generic confirmation dialog
    // You can also add a custom message, but most browsers ignore it for security reasons
};




// แสดง Progress Bar
// สถิติ Pomodoro