import { Date } from '../domain/entities/Date';

export const generateRandomDate = (): Date => {
  const year = Math.floor(Math.random() * 31) + 2000;
  const month = Math.floor(Math.random() * 12) + 1;
  const maxDay = getMaxDayInMonth(year, month);
  const day = Math.floor(Math.random() * maxDay) + 1;

  return new Date({ year, month, day });
};

export function getMaxDayInMonth(year: number, month: number): number {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      return 29;
    }
    return 28;
  }

  return daysInMonth[month - 1];
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
