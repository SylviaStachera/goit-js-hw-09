import Notiflix from 'notiflix';
//========================================================
const btn = document.querySelector('button[type=submit]');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
//console.log(btn);
//========================================================
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        //console.log('Fulfill');
        resolve({ position, delay });
      } else {
        //console.log('Reject');
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

btn.addEventListener('click', e => {
  e.preventDefault();

  let firstDelay = Number(delay.value);
  let stepDelay = Number(step.value);

  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, firstDelay + i * stepDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
