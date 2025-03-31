/**
 * Date formatting utilities using Swiss (Zurich) timezone with de-CH locale
 */

/**
 * Format a date using Swiss (de-CH) formatting in the Zurich timezone
 * @param date Date to format (Date object or timestamp)
 * @param options Intl.DateTimeFormatOptions to customize the output
 * @returns Formatted date string
 */
export const formatSwissDate = (
  date: Date | number = new Date(),
  options: Intl.DateTimeFormatOptions = {}
): string => {
  // Create a date object
  const dateObject = date instanceof Date ? date : new Date(date);

  // Default options for Swiss format
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Europe/Zurich",
    ...options,
  };

  // Format with Swiss German locale (de-CH)
  return new Intl.DateTimeFormat("de-CH", defaultOptions).format(dateObject);
};

/**
 * Format a date as date only (DD.MM.YYYY) in Swiss format
 * @param date Date to format
 * @returns Date-only formatted string
 */
export const formatSwissDateOnly = (
  date: Date | number = new Date()
): string => {
  return formatSwissDate(date, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * Format a date as time only (HH:MM:SS) in Swiss format
 * @param date Date to format
 * @param showSeconds Whether to include seconds in the output
 * @returns Time-only formatted string
 */
export const formatSwissTimeOnly = (
  date: Date | number = new Date(),
  showSeconds: boolean = true
): string => {
  return formatSwissDate(date, {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: false,
  });
};

/**
 * Format a date as short date (DD.MM.YY) in Swiss format
 * @param date Date to format
 * @returns Short date formatted string
 */
export const formatSwissShortDate = (
  date: Date | number = new Date()
): string => {
  return formatSwissDate(date, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * Format a date with both date and time in Swiss format
 * @param date Date to format
 * @param showSeconds Whether to include seconds in the output
 * @returns Date and time formatted string
 */
export const formatSwissDateTime = (
  date: Date | number = new Date(),
  showSeconds: boolean = true
): string => {
  return formatSwissDate(date, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: false,
  });
};
