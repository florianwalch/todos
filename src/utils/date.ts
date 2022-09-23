import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// add plugin
dayjs.extend(relativeTime);

/**
 * Wrapper for dayjs fromNow function.
 *
 * @param {dayjs.ConfigType} date - dayjs acceptable date
 */
function dateFromNow(date: dayjs.ConfigType): string {
  return dayjs(date).fromNow();
}

/**
 * Wrapper for dayjs toISOString.
 *
 * @param {dayjs.ConfigType} date - dayjs acceptable date
 */
function dateToISO(date?: dayjs.ConfigType): string {
  return dayjs(date).toISOString();
}

/**
 * Wrapper for dayjs format function.
 *
 * @param {dayjs.ConfigType} date - dayjs acceptable date
 * @param format - date format (default is 'YYYY-MM-DD')
 */
function formatDate(date: dayjs.ConfigType, format = 'YYYY-MM-DD'): string {
  return dayjs(date).format(format);
}

/**
 * Wrapper for dayjs isBefore function.
 * Returns true if the day of the passed date is
 * before the next day of the current date.
 *
 * @param {dayjs.ConfigType} date - dayjs acceptable date
 */
function dateIsBefore(date: dayjs.ConfigType): boolean {
  return dayjs(date).isBefore(dayjs().add(1, 'day'), 'day');
}

// export helper function
export const DateUtil = {
  dateFromNow,
  dateToISO,
  formatDate,
  dateIsBefore,
};
