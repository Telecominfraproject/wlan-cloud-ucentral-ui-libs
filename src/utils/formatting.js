const prettyNumber = (number) => {
  if (number >= 10) {
    return number;
  }
  return `0${number}`;
};

const unixToDateString = (unixNumber) => unixNumber * 1000;

export const prettyDate = (dateString) => {
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
