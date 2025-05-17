import {
  formatSwissDate,
  formatSwissDateOnly,
  formatSwissTimeOnly,
  formatSwissDateTime,
  formatSwissShortDate,
} from "./time";

/**
 * Interface for date formatting functions
 */
interface DateFormattingUtils {
  formatSwissDate: typeof formatSwissDate;
  formatSwissDateOnly: typeof formatSwissDateOnly;
  formatSwissTimeOnly: typeof formatSwissTimeOnly;
  formatSwissDateTime: typeof formatSwissDateTime;
  formatSwissShortDate: typeof formatSwissShortDate;
}

/**
 * Expose date formatting utilities to global window object for microfrontends
 */
export const exposeDateFormattersToWindow = (): void => {
  // Create global namespace for utilities
  if (!window.hasOwnProperty("shellUtils")) {
    (window as any).shellUtils = {};
  }

  // Add date formatters to the global namespace
  (window as any).shellUtils.dateFormatters = {
    formatSwissDate,
    formatSwissDateOnly,
    formatSwissTimeOnly,
    formatSwissDateTime,
    formatSwissShortDate,
  };

  console.log(
    "Swiss date formatters exposed to window.shellUtils.dateFormatters"
  );
};
