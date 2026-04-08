import { Number } from '../domain/entities/Number';

export const generateRandomNumber = (min: number = 1, max: number = 99999999): Number => {
  if (min > max) {
    [min, max] = [max, min];
  }
  min = Math.max(1, min);
  max = Math.min(99999999, max);
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Number(random);
};
