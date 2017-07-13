export function convertFrequency(frequency) {
  if (frequency === 1) return 'Daily';
  if (frequency === 7) return 'Weekly';
  if (frequency === 30 || frequency === 31) return 'Monthly';
  if (frequency === 14) return 'Bi-Weekly';
  else return `Every ${frequency} Days`;
}

