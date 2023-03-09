// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/flatpickr.min.css';

//===================================
const dataText = document.querySelector('#datetime-picker');
const date = new Date();
const btnStart = document.querySelector('button[data-start]');
//====================================
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: date,
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
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
