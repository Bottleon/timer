/* define html element */
const STOP_WATCH_CLOCK = document.getElementById("stop_watch_clock");
const STOP_WATCH_START = document.getElementById("stop_watch_start_btn");
const STOP_WATCH_RESTART = document.getElementById("stop_watch_restart_btn");
const STOP_WATCH_RESET = document.getElementById("stop_watch_reset_btn");
const STOP_WATCH_PAUSE = document.getElementById("stop_watch_puase_btn");
const STOP_WATCH_SUB_CLOCK = document.getElementById("stop_watch_sub_clock");

/* define global variable */
let stopWatchHours = 0;
let stopWatchMinutes = 0;
let stopWatchSeconds = 0;
let stopWatchCenti = 0;

/* add Event */
STOP_WATCH_START.addEventListener("click", stopWatchStartFunc);
STOP_WATCH_RESET.addEventListener("click", stopWatchResetFunc);
STOP_WATCH_PAUSE.addEventListener("click", stopWatchPuaseFunc);
STOP_WATCH_RESTART.addEventListener("click", stopWatchRestartFunc);

/* define STOP_WATCH javascript Object */
const STOP_WATCH = {
  clock: null,
};

/* click start Button function */
function stopWatchStartFunc() {
  STOP_WATCH_START.type = "hidden";
  //STOP_WATCH_RESTART.type = "button";
  STOP_WATCH_PAUSE.type = "button";
  STOP_WATCH.clock = setInterval(startStopWatch, 10);
}

/* increase 0.01 second function*/
function startStopWatch() {
  stopWatchCenti++;

  if (stopWatchCenti % 60 == 0) {
    stopWatchSeconds++;
    stopWatchCenti = 0;
    if (stopWatchSeconds % 60 == 0) {
      stopWatchMinutes++;
      stopWatchSeconds = 0;
      if (stopWatchMinutes % 60 == 0) {
        stopWatchHours++;
        stopWatchMinutes = 0;
      }
    }
  }
  setTime();
}

/* reset stopwatch */
function stopWatchResetFunc() {
  clearInterval(STOP_WATCH.clock);
  stopWatchHours = 0;
  stopWatchMinutes = 0;
  stopWatchSeconds = 0;
  stopWatchCenti = 0;
  setTime();
  STOP_WATCH_PAUSE.type = "hidden";
  STOP_WATCH_RESTART.type = "hidden";
  STOP_WATCH_START.type = "button";
}

/** pause stopwatch */
function stopWatchPuaseFunc() {
  clearInterval(STOP_WATCH.clock);
  STOP_WATCH_PAUSE.type = "hidden";
  STOP_WATCH_RESTART.type = "button";
}

/** restart stopwatch */
function stopWatchRestartFunc() {
  STOP_WATCH_RESTART.type = "hidden";
  stopWatchStartFunc();
}

/** time setting */
function setTime() {
  STOP_WATCH_CLOCK.innerText = `${
    stopWatchHours < 10 ? `0${stopWatchHours}` : stopWatchHours
  }:${stopWatchMinutes < 10 ? `0${stopWatchMinutes}` : stopWatchMinutes}:${
    stopWatchSeconds < 10 ? `0${stopWatchSeconds}` : stopWatchSeconds
  } `;
  STOP_WATCH_SUB_CLOCK.innerHTML = `${
    stopWatchCenti < 10 ? `0${stopWatchCenti}` : stopWatchCenti
  }`;
}
