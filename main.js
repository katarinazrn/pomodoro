let num_sessions = 4;
let session_duration = 25;
let break_duration = 5;

let start_button = document.getElementById("start");
let pause_button = document.getElementById("pause");
let reset_button = document.getElementById("reset");

let current = document.getElementById("current");
let timer_element = document.getElementById("timer");
let status_element = document.getElementById("status");
let type = document.getElementById("type");

let inputElements = document.getElementsByClassName("input");
let sessions_num_input = document.getElementById("sessions-num");
let session_duration_input = document.getElementById("sessions-duration");
let break_duration_input = document.getElementById("break-duration");

let end = document.getElementById("end");

let timer;

let current_session_number = 1;
let minutes;
let seconds;

let current_status = null;

start_button.addEventListener("click", () => {
  init();
  timer = getInterval();
  
  setTimeout(() => {
    start_button.style.display='none';
  }, 800);
  
});

pause_button.addEventListener("click", () => {
  if (pause_button.innerHTML === "Pauziraj") {
    pause_button.innerHTML = "Nastavi";
    clearInterval(timer);
  } else {
    pause_button.innerHTML = "Pauziraj";
    timer = getInterval();
  }
});

reset_button.addEventListener("click", () => {
  for (const element of inputElements) {
    element.classList.remove("editing");
  }

  session_duration_input.disabled = false;
  sessions_num_input.disabled = false;
  break_duration_input.disabled = false;

  clearInterval(timer);
  current.style.display = "none";
  start_button.classList.remove('move-right');
  start_button.style.display = "flex";
  end.style.display = "none";

});

for (const element of inputElements) {
  element.addEventListener("click", () => {
    element.classList.add("editing");
    element.classList.remove("hover");
    element.children[0].focus();
  });
  element.addEventListener("mouseover", () => {
    if (!element.classList.contains("editing")) {
      element.classList.add("hover");
    }
  });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("hover");
  });

  element.children[0].addEventListener("blur", () => {
    element.classList.remove("editing");
  });
}

function getInterval() {
  return setInterval(() => {
    seconds -= 1;
    if (seconds < 0) {
      seconds = 59;
      minutes -= 1;

      if (minutes < 0) {
        seconds = 0;
        if (current_status == "pomodoro") {
          current_status = "break";
          minutes = break_duration;
          type.innerHTML = "Pauza";
        } else if (current_status == "break") {
          current_session_number++;
          current_status = "pomodoro";
          minutes = session_duration;
          type.innerHTML = "Pomodoro";
          status_element.innerHTML =
            current_session_number + "/" + num_sessions;
        }

        if (
          current_session_number > num_sessions ||
          (current_status === "break" && current_session_number == num_sessions)
        ) {
          clearInterval(timer);
          end.style.display = "flex";
          timer_element.style.display = "none";
          pause_button.style.display = "none";
          type.style.display = "none";
        }
      }
    }

    displayTimer();
  }, 1000);
}



function init() {
  start_button.classList.add('move-right');
  timer_element.style.display = "block";
  pause_button.style.display = "block";
  type.style.display = "block";
  type.innerHTML='Pomodoro';
  pause_button.innerHTML = "Pauziraj";
  current.style.display = "flex";

  current_session_number = 1;
  num_sessions = parseInt(sessions_num_input.value);
  if (isNaN(num_sessions)) {
    num_sessions = 4;
    sessions_num_input.value = "4";
  }
  if (num_sessions > 99) {
    num_sessions = 99;
    sessions_num_input.value = "99";
  }

  session_duration = parseInt(session_duration_input.value);
  if (isNaN(session_duration)) {
    session_duration = 25;
    session_duration_input.value = "25";
  }
  break_duration = parseInt(break_duration_input.value);
  if (isNaN(break_duration)) {
    break_duration = 4;
    break_duration_input.value = "4";
  }

  status_element.innerHTML = current_session_number + "/" + num_sessions;
  timer_element.innerHTML = session_duration + ":00";
  minutes = session_duration;
  seconds = 0;

  for (const element of inputElements) {
    element.classList.add("editing");
  }

  session_duration_input.disabled = true;
  sessions_num_input.disabled = true;
  break_duration_input.disabled = true;

  current_status = "pomodoro";
}

function displayTimer() {
  let m = minutes > 9 ? minutes : "0" + minutes;
  let s = seconds > 9 ? seconds : "0" + seconds;
  timer_element.innerHTML = m + ":" + s;
}
