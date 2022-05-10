/** define html element */
const TIMER_CLOCK = document.getElementById("timer_clock");
const TIMER_START = document.getElementById("timer_start_btn");
const TIMER_RESET = document.getElementById("timer_reset_btn");
const TIME_SELECT = document.querySelectorAll(".timeSelect");
const TIMER_RESTART = document.getElementById("timer_restart_btn");
const TIMER_PAUSE = document.getElementById("timer_pause_btn");

/** define global variable */
let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;

let increaseTime = 0;
let increaseTimeType = "";

/** add Event */
TIMER_START.addEventListener("click", timerClickFunc);
TIMER_RESET.addEventListener("click", resetTimerFunc);
TIMER_RESTART.addEventListener("click", restartTimerFunc);
TIMER_PAUSE.addEventListener("click", pauseTimerFunc);
TIME_SELECT.forEach((ele) => ele.addEventListener("click", settingTimeFunc));

/** define timer javascript Object */
const TIMER = {
  clock: null,
};

/* timer click function */
function timerClickFunc() {
  TIMER_START.type = "hidden";
  TIMER_PAUSE.type = "button";
  TIMER_START.style.opacity = "";
  TIMER_PAUSE.style.opacity = "";
  TIMER.clock = setInterval(startTimer, 1000);
}

/** start timer */
function startTimer() {
  if (timerSeconds != 0) {
    timerSeconds--;
  } else {
    if (timerMinutes != 0) {
      timerMinutes--;
      timerSeconds = 59;
    } else {
      if (timerHours != 0) {
        timerHours--;
        timerMinutes = 59;
      }
    }
  }
  if (timerHours == 0 && timerMinutes == 0 && timerSeconds <= 0) {
    clearInterval(TIMER.clock);
    timerSeconds++;
    TIMER_PAUSE.type = "hidden";
    TIMER_START.type = "button";
    TIMER_START.disabled = true;
    TIMER_RESET.disabled = true;
    TIMER_START.style.opacity = "0.6";
    TIMER_PAUSE.style.opacity = "0.6";
    alert("타이머가 종료되었습니다.");
  }
  setTimer();
}

/** reset timer */
function resetTimerFunc() {
  clearInterval(TIMER.clock);
  timerHours = 0;
  timerMinutes = 0;
  timerSeconds = 0;
  TIMER_PAUSE.type = "hidden";
  TIMER_START.type = "button";
  TIMER_START.disabled = true;
  TIMER_RESET.disabled = true;
  TIMER_START.style.opacity = "0.6";
  TIMER_PAUSE.style.opacity = "0.6";
  setTimer();
}

/** restart timer */
function restartTimerFunc() {
  TIMER_RESTART.type = "hidden";
  timerClickFunc();
}

/** pause timer */
function pauseTimerFunc() {
  TIMER_PAUSE.type = "hidden";
  TIMER_RESTART.type = "button";
  clearInterval(TIMER.clock);
}

/** time setting when increasing button click */
function settingTimeFunc() {
  const timeContent = this.textContent;
  const timeRegex = /[^0-9]/g;
  const koreanRegex = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
  increaseTime = parseInt(timeContent.replace(timeRegex, ""));
  increaseTimeType = timeContent.replace(koreanRegex, "").substring(1);
  switch (increaseTimeType) {
    case "초":
      timerSeconds += increaseTime;
      if (timerSeconds >= 60) {
        timerSeconds = 59;
      }
      break;
    case "분":
      timerMinutes += increaseTime;
      if (timerMinutes >= 60) {
        timerMinutes = 59;
      }
      break;
    case "시간":
      timerHours += increaseTime;
      if (timerHours >= 60) {
        timerHours = 59;
      }
      break;
  }
  setTimer();
  TIMER_START.style.opacity = "1";
  TIMER_PAUSE.style.opacity = "1";
  TIMER_START.disabled = false;
  TIMER_RESET.disabled = false;
}

/** time setting */
function setTimer() {
  TIMER_CLOCK.innerText = `${timerHours < 10 ? `0${timerHours}` : timerHours}:${
    timerMinutes < 10 ? `0${timerMinutes}` : timerMinutes
  }:${timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}`;
}
