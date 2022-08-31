console.log('activeProjectsList.projects');
stopIntervalId = setInterval(() => {
  console.log('I am in the interval');
}, 3000);
console.log(stopIntervalId);

/* document.querySelector('#start-analytics-btn').addEventListener('click', () => {
  clearInterval(stopIntervalId);
}); */

