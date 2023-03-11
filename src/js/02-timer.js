import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

//===================================
const dataText = document.querySelector('#datetime-picker');
const date = new Date();
const btnStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
//================WYBÓR POPRAWNEJ DATY====================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    if (selectedDates[0].getTime() < date.getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      //window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');
    }

    if (selectedDates[0].getTime() >= date.getTime()) {
      btnStart.removeAttribute('disabled');
    }
  },
};
flatpickr(dataText, options);
//================ODLICZANIE==============================
//Aby obliczyć wartości użyj gotowej funkcji convertMs, gdzie ms - różnica między końcową i aktualną datą w milisekundach.

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  //console.log(days);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

btnStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    btnStart.setAttribute('disabled', '');

    let ms = new Date(dataText.value) - new Date();
    // console.log(new Date(dataText.value));
    //console.log(new Date());

    if (ms >= 0) {
      let msObject = convertMs(ms);
      dataDays.textContent = addLeadingZero(msObject.days);
      dataHours.textContent = addLeadingZero(msObject.hours);
      dataMinutes.textContent = addLeadingZero(msObject.minutes);
      dataSeconds.textContent = addLeadingZero(msObject.seconds);
    } else {
      clearInterval(timer);
      btnStart.removeAttribute('disabled');
      Notiflix.Notify.info('Counting ended!');
    }
  }, 1000);
});
