/* get our elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const buttonFullscreen = document.querySelector('.full-screen')

/* build out functions*/

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    if (video.paused){
        toggle.textContent = '❚ ❚'
    }else{
        toggle.textContent = '►' 
    }
}

function skip() {
    console.log(typeof(this.dataset.skip));
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value;
  
}

function handleProgress() {
    const percent= (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
     console.log(e);
     const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
     video.currentTime = scrubTime
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
toggle.addEventListener('click', updateButton)

skipButtons.forEach(button => {
    button.addEventListener('click', skip)
});

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub)

let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

buttonFullscreen.addEventListener('click', () => player.requestFullscreen())
buttonFullscreen.addEventListener('click', () => document.exitFullscreen())