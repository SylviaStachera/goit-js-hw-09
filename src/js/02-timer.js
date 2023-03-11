// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/flatpickr.min.css';

//===================================
const dataText = document.querySelector('#datetime-picker');
const date = new Date();
const btnStart = document.querySelector('button[data-start]');
//================WYBÓR POPRAWNEJ DATY====================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
   // console.log(selectedDates[0].getTime());
    if (selectedDates[0].getTime() < date.getTime()) {
      window.alert('Please choose a date in the future');
      btnStart.setAttribute('disabled', '');
    }

    if (selectedDates[0].getTime() >= date.getTime()) {
      btnStart.removeAttribute('disabled');
    }
  },
};
flatpickr(dataText, options);
//================ODLICZANIE==============================
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  console.log(days);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

btnStart.addEventListener('click', () => {
  //let currentDate = dataText.getTime();
  console.log(dataText.currentTarget);
  // convertMs(new Date(dataText));
  //console.log(convertMs())
});
