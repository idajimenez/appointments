/**
 * Get array of month names
 * @param {Boolean} shortName - indicate if short form of the month names should be returned
 * @returns {Array}
 */
export function getMonthNames(shortName = false) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (shortName) {
    return months.map(month => month.slice(0, 3));
  }

  return months;
}

/**
 * Get formatted date
 * @param {String} dateToFormat
 * @returns {String}
 */
export function formatDate(dateToFormat) {
  const months = getMonthNames(true);
  const date = new Date(dateToFormat);
  const m = date.getMonth();

  return `${months[m]} ${date.getDate()}`;
}
