//get elems
//build functions
//hook events


const player = document.querySelector('.player');
// const video = player.querySelector('.viewer');
const [video, progress, progressBar, toggle, skipButtons, ranges] = [player.querySelector('.viewer'), player.querySelector('.progress'), player.querySelector('.progress__filled'), player.querySelector('.toggle'), player.querySelectorAll('[data-skip]'), player.querySelectorAll('.player__slider')];

console.log(video);


function togglePlay(){
  video.paused ? video.play() : video.pause()
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
  console.log(this.dataset)
  video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
}

function handleProgress(){
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e){
  if(mouseDown = false) return;
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn =>btn.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

progress.addEventListener('click', scrub)
let mouseDown = false;
progress.addEventListener('mosemove', () => mouseDown ? scrub : null);
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
