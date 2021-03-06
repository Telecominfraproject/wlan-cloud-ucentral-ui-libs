const prettyNumber = (number) => {
  if (number >= 10) {
    return number;
  }
  return `0${number}`;
};

const unixToDateString = (unixNumber) => unixNumber * 1000;

export const prettyDate = (dateString) => {
  if (!dateString || dateString === null) return '-';
  const convertedTimestamp = unixToDateString(dateString);
  const date = new Date(convertedTimestamp);
  return `${date.getFullYear()}-${prettyNumber(date.getMonth() + 1)}-${prettyNumber(date.getDate())}
  ${prettyNumber(date.getHours())}:${prettyNumber(date.getMinutes())}:${prettyNumber(
    date.getSeconds(),
  )}`;
};

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const emailToName = (email) => {
  if (email) {
    const pre = email.split('@')[0];
    if (!pre.includes('.')) {
      return `${pre.substring(0, 2).toUpperCase()}`;
    }
    const parts = pre.split('.');
    return `${parts[0].charAt(0).toUpperCase()}${parts[1].charAt(0).toUpperCase()}`;
  }
  return 'N/A';
};

export const cleanBytesString = (bytes, decimals = 2) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes || bytes === 0) {
    return '0 B';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const secondsToDetailed = (
  seconds,
  dayLabel,
  daysLabel,
  hourLabel,
  hoursLabel,
  minuteLabel,
  minutesLabel,
  secondLabel,
  secondsLabel,
) => {
  if (!seconds || seconds === 0) return `0 ${secondsLabel}`;
  let secondsLeft = seconds;
  const days = Math.floor(secondsLeft / (3600 * 24));
  secondsLeft -= days * (3600 * 24);
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft -= hours * 3600;
  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft -= minutes * 60;

  let finalString = '';

  if (days > 0)
    finalString =
      days === 1 ? `${finalString}${days} ${dayLabel}, ` : `${finalString}${days} ${daysLabel}, `;
  if (hours > 0)
    finalString =
      hours === 1
        ? `${finalString}${hours} ${hourLabel}, `
        : `${finalString}${hours} ${hoursLabel}, `;
  if (minutes > 0)
    finalString =
      minutes === 1
        ? `${finalString}${minutes} ${minuteLabel}, `
        : `${finalString}${minutes} ${minutesLabel}, `;
  if (secondsLeft > 0)
    finalString =
      secondsLeft === 1
        ? `${finalString}${secondsLeft} ${secondLabel}`
        : `${finalString}${secondsLeft} ${secondsLabel}`;

  return finalString;
};

export const compactSecondsToDetailed = (seconds, dayLabel, daysLabel, secondsLabel) => {
  if (!seconds || seconds === 0) return `0 ${secondsLabel}`;
  let secondsLeft = seconds;
  const days = Math.floor(secondsLeft / (3600 * 24));
  secondsLeft -= days * (3600 * 24);
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft -= hours * 3600;
  const minutes = Math.floor(secondsLeft / 60);
  secondsLeft -= minutes * 60;

  let finalString = '';

  finalString =
    days === 1 ? `${finalString}${days} ${dayLabel}, ` : `${finalString}${days} ${daysLabel}, `;
  finalString = `${finalString}${prettyNumber(hours)}:`;
  finalString = `${finalString}${prettyNumber(minutes)}:`;
  finalString = `${finalString}${prettyNumber(secondsLeft)}`;

  return finalString;
};

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};

const rtf = new Intl.RelativeTimeFormat('en', { localeMatcher: 'best fit', style: 'long' });

export const formatDaysAgo = (d1, d2 = new Date()) => {
  const convertedTimestamp = unixToDateString(d1);
  const date = new Date(convertedTimestamp);
  const elapsed = date - d2;

  for (const [key] of Object.entries(units))
    if (Math.abs(elapsed) > units[key] || key === 'second')
      return rtf.format(Math.round(elapsed / units[key]), key);

  return prettyDate(date);
};

export const checkIfJson = (string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const testRegex = (value, regexString) => {
  const regex = new RegExp(regexString);
  return regex.test(value);
};

export const numberToCompact = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((i) => num >= i.value);
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
