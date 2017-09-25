let countdown;
const buttons = document.querySelectorAll('[data-time]');
const endTime = document.querySelector('.display__end-time');
function timer(seconds){
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTime(seconds)
  displayEndTime(then)
  console.log({now, then})
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft <= 0) clearInterval(countdown);
    displayTime(secondsLeft)
  }, 1000);
}
  function displayTime(seconds){
    const displayElem = document.querySelector('.display__time-left')
    console.log(seconds)
    let [hours, minutes] = [0, 0];
    if(seconds / 3600 >= 1){
      hours = Math.round(seconds / 3600);
      seconds = seconds % 3600;
    } 
    if(seconds / 60 >= 1){
      minutes = Math.round(seconds / 60);
      minutes > 1 ? minutes-- : minutes;
      seconds = seconds % 60;
    } 
    const span = document.createElement('span');
    let display = `${hours} : ${minutes} : ${seconds}`;
    [displayElem.textContent, document.title] = [display, display];

    console.log(hours, seconds)
  }

  function displayEndTime(timestamp){
    console.log(timestamp)
    let x = new Date(timestamp);
    let adjustedHour = x.getHours();
    adjustedHour > 12 ? adjustedHour -= 12 : null;
    const minutes = x.getMinutes();
    const remainderSeconds = x.getSeconds();

    endTime.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0':''}${minutes}`
  }

  function startTimer(e){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);

  }

  buttons.forEach(btn => btn.addEventListener('click', startTimer))
  document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    this.reset();
    timer(mins * 60);
  });