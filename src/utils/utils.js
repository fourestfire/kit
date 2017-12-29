import moment from 'moment';
import { Dimensions } from 'react-native';

export function isDeviceSmall() {
  let { width } = Dimensions.get('window');
  if (width <= 320) return true;
  else return false;
}

export function convertFrequencyToText(frequency) {
  if (frequency === 1) return 'Daily';
  if (frequency === 7) return 'Weekly';
  if (frequency === 14) return 'Bi-Weekly';
  if (frequency === 21) return 'Every 3 weeks';
  if (frequency === 30 || frequency === 31) return 'Monthly';
  if (frequency === 60 || frequency === 61) return 'Bi-Monthly';
  if (frequency >= 90 && frequency <= 95) return 'Quarterly';
  if (frequency >= 360 && frequency <= 366) return 'Yearly';
  else return `Every ${frequency} days`;
}

export function convertTextToFrequency(text) {
  if (text === 'Daily') return 1;
  if (text === 'Weekly') return 7;
  if (text === 'Bi-weekly') return 14;
  if (text === 'Every 3 weeks') return 21;
  if (text === 'Monthly') return 31;
  if (text === 'Quarterly') return 90;
  if (text === 'Bi-annually') return 180;
  else return 21;
}

export function convertDiff(diff) {
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff === 2) return 'Two Days Ago';
  if (diff >= 3 && diff <= 6) return convertDayOfWeek(diff);
  if (diff >= 7 && diff <= 13) return `Last ${convertDayOfWeek(diff)}`;
  if (diff >= 14 && diff <= 20) return 'Two Weeks Ago';
  if (diff >= 21 && diff <= 29) return 'Three Weeks Ago';
  if (diff >= 30 && diff <= 61) return 'Last Month';
  if (diff >= 62 && diff <= 95) return 'Two Months Ago';
  if (diff >= 95 && diff <= 250) return 'A Few Months Ago';
  if (diff >= 365 && diff <= 730) return 'Last Year';
  if (diff > 730) return 'More Than A Year';
}

function convertDayOfWeek(diff) {
  let num = (moment().day() - diff); // alternatively can display using .format('dddd')
  if (num % 7 === 0) return 'Sunday';
  if (num % 7 === 1) return 'Monday';
  if (num % 7 === 2) return 'Tuesday';
  if (num % 7 === 3) return 'Wednesday';
  if (num % 7 === 4) return 'Thursday';
  if (num % 7 === 5) return 'Friday';
  if (num % 7 === 6) return 'Saturday';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export function randomNextContactDate(variance) {
  let daysToAdd = getRandomInt(0, variance); // variance of 1 to NOT have a random next date
  return parseInt(moment().add(daysToAdd, 'day').format('x'), 10);
}

export function convertColor(str) {
  if (str === 'Group 1') return 'purple';
  if (str === 'Group 2') return '#73d4e3';
  if (str === 'Group 3') return 'green';
  if (str === 'None') return 'transparent';
  return 'grey';
}
