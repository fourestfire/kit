import moment from 'moment';
import { Dimensions } from 'react-native';
import { getSettings } from '../redux/realm';

export function isDeviceSmall() {
  let { width } = Dimensions.get('window');
  if (width <= 320) return true;
  else return false;
}

export function convertFrequencyToText(frequency, type) {
  let text;
  if (frequency === 1) text = 'Daily';
  else if (frequency === 7) text = 'Weekly';
  else if (frequency === 14) text = 'Bi-Weekly';
  else if (frequency === 21) text = 'Every 3 weeks';
  else if (frequency === 30 || frequency === 31) text = 'Monthly';
  else if (frequency === 60 || frequency === 61) text = 'Bi-Monthly';
  else if (frequency >= 90 && frequency <= 95) text = 'Quarterly';
  else if (frequency >= 180 && frequency <= 182) text = 'Bi-Annually';
  else if (frequency >= 360 && frequency <= 366) text = 'Yearly';
  else text = `Every ${frequency} days`;

  if (type === 'camel') return text;
  else return text.toLowerCase();
}

export function convertTextToFrequency(text) {
  text = text.toLowerCase();
  if (text === 'daily') return 1;
  if (text === 'weekly') return 7;
  if (text === 'bi-weekly') return 14;
  if (text === 'every 3 weeks') return 21;
  if (text === 'monthly') return 31;
  if (text === 'bi-monthly') return 60;
  if (text === 'quarterly') return 90;
  if (text === 'bi-annually') return 180;
  else return 21;
}

export function convertFrequencyToIndex(frequency) {
  if (frequency === 7) return 0;
  if (frequency === 14) return 1;
  if (frequency === 21) return 2;
  if (frequency === 30 || frequency === 31) return 3;
  if (frequency === 60 || frequency === 61) return 4;
  if (frequency >= 90 && frequency <= 95) return 5;
  if (frequency >= 180 && frequency <= 182) return 6;
  else return 7;
}

export function convertDiff(diff) {
  let text;
  if (diff === 0) text = 'Today';
  else if (diff === 1) text = 'Yesterday';
  else if (diff === 2) text = 'Two Days Ago';
  else if (diff >= 3 && diff <= 6) text = convertDayOfWeek(diff);
  else if (diff >= 7 && diff <= 13) text = `Last ${convertDayOfWeek(diff)}`;
  else if (diff >= 14 && diff <= 20) text = 'Two Weeks Ago';
  else if (diff >= 21 && diff <= 29) text = 'Three Weeks Ago';
  else if (diff >= 30 && diff <= 61) text = 'Last Month';
  else if (diff >= 62 && diff <= 95) text = 'Two Months Ago';
  else if (diff >= 95 && diff <= 250) text = 'A Few Months Ago';
  else if (diff >= 365 && diff <= 730) text = 'Last Year';
  else if (diff > 730) text = 'More Than A Year';
  else text = 'sometime';
  return text;
}

function convertDayOfWeek(diff) {
  let num = (moment().day() - diff); // alternatively can display using .format('dddd')
  if (num < 7) num += 7;

  let text;
  if (num % 7 === 0) return 'Sunday';
  if (num % 7 === 1) return 'Monday';
  if (num % 7 === 2) return 'Tuesday';
  if (num % 7 === 3) return 'Wednesday';
  if (num % 7 === 4) return 'Thursday';
  if (num % 7 === 5) return 'Friday';
  if (num % 7 === 6) return 'Saturday';
  return 'Someday';
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export function randomNextContactDate(variance) {
  let daysToAdd = getRandomInt(0, 1); // variance of 1 to NOT have a random next date
  return parseInt(moment().add(daysToAdd, 'day').format('x'), 10);
}

export function convertColor(str) {
  if (str === 'Group 1') return getSettings().color1;
  if (str === 'Group 2') return getSettings().color2;
  if (str === 'Group 3') return getSettings().color3;
  if (str === 'None') return 'transparent';
  return 'grey';
}
