import moment from 'moment';

export function convertFrequency(frequency) {
  if (frequency === 1) return 'Daily';
  if (frequency === 7) return 'Weekly';
  if (frequency === 14) return 'Bi-Weekly';
  if (frequency === 30 || frequency === 31) return 'Monthly';
  else return `Every ${frequency} Days`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export function randomNextContactDate() {
  let daysToAdd = getRandomInt(0, 5);
  return parseInt(moment().add(daysToAdd, 'day').format('x'), 10);
}
