import { Number } from '../domain/entities/Number';

export const generateRandomNumber = (): Number => {
  const random = Math.floor(Math.random() * 10000) + 1;
  return new Number(random);
};
