//Genertor losowego koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
//==============================
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
//=============================

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', '');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log("The color is changing!")
});

btnStop.addEventListener('click', () => {
  btnStart.removeAttribute('disabled');
  clearInterval(timerId);
  console.log('The color change has been stopped!');
});
