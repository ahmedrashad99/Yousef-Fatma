import { wedding } from "../data/wedding.js";

// Turns a "YYYY-MM-DD..." string into a Date. Returns null when invalid.
export function parseDate(value) {
  if (!value) return null;
  // A plain "YYYY-MM-DD" is read by JavaScript as UTC midnight, which can show
  // the previous day in some time zones. Treat it as local midnight instead.
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    console.warn(`[wedding.js] "${value}" is not a valid date. Use "YYYY-MM-DDTHH:MM:SS".`);
    return null;
  }
  return date;
}

export const weddingDate = parseDate(wedding.event.date);

const locale = wedding.event.locale || "en-US";

// "Sunday, June 20, 2027"
export function formatLongDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// "June 20, 2027"
export function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

// "Sunday"
export function formatWeekday(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
}

// "20 · 06 · 2027"
export function formatNumericDate(date) {
  if (!date) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(date.getDate())} · ${pad(date.getMonth() + 1)} · ${date.getFullYear()}`;
}

// Splits the time between two moments into days/hours/minutes/seconds.
// Once the target has passed, `isPast` is true and every value is 0.
export function getTimeLeft(targetMs, nowMs) {
  const diff = targetMs - nowMs;
  if (!Number.isFinite(diff)) return null;
  if (diff <= 0) return { isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    isPast: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
