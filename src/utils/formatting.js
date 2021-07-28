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
