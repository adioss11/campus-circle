export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 240;

export const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export type Month = (typeof MONTHS)[number];

export const CAMPUS_LOCATIONS = [
  "Student Center",
  "Campus Commons",
  "Student Lounge",
  "Library",
  "Main Quad",
  "Dining Hall",
  "Recreation Center",
  "Engineering Building",
] as const;

const DAYS_IN_MONTH: Record<Month, number> = {
  JAN: 31,
  FEB: 29,
  MAR: 31,
  APR: 30,
  MAY: 31,
  JUN: 30,
  JUL: 31,
  AUG: 31,
  SEP: 30,
  OCT: 31,
  NOV: 30,
  DEC: 31,
};

export function daysInMonth(month: string): number {
  if (month in DAYS_IN_MONTH) {
    return DAYS_IN_MONTH[month as Month];
  }
  return 31;
}

export function formatClockTime(value: string): string {
  const [hourText, minuteText] = value.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "";
  }
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minuteText} ${suffix}`;
}

export function timeToMinutes(value: string): number {
  const [hourText, minuteText] = value.split(":");
  return Number(hourText) * 60 + Number(minuteText);
}
