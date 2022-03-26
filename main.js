let num_sessions = 4;
let session_duration = 25;
let break_duration = 5;

let start_button = document.getElementById("start");
let timer_element = document.getElementById("timer");

let status_element = document.getElementById("status");

let timer;

let current_session_number = 1;
let minutes;
let seconds;

let current_status = null;

start_button.addEventListener("click", () => {
  init();

  timer = setInterval(() => {
    seconds -= 1;
    if (seconds < 0) {
      seconds = 59;
      minutes -= 1;

      if (minutes < 0) {
        current_session_number++;
        seconds = 0;
        if (current_status == "pomodoro") {
          current_status = "break";

          minutes = break_duration;
          document.getElementById("type").innerHTML = "Break";
        } else if (current_status == "break") {
          current_status = "pomodoro";
          minutes = session_duration;
          document.getElementById("type").innerHTML = "Pomodor";
        }

        status_element.innerHTML = current_session_number + "/" + num_sessions;

        if (current_session_number > num_sessions) {
          //kraj
        }
      }
    }

    displayTimer();
  }, 1000);
});

function init() {
  current_session_number = 1;
  num_sessions = +document.getElementById("sessions-num").value;
  session_duration = +document.getElementById("sessions-duration").value;
  break_duration = +document.getElementById("break-duration").value;

  status_element.innerHTML = current_session_number + "/" + num_sessions;
  timer_element.innerHTML = session_duration + ":00";
  minutes = session_duration;
  seconds = 0;

  current_status = "pomodoro";
}

function displayTimer() {
  let m = minutes > 9 ? minutes : "0" + minutes;
  let s = seconds > 9 ? seconds : "0" + seconds;
  timer_element.innerHTML = m + ":" + s;
}
