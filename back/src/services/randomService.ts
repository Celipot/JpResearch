import { Nombre } from '../domain/entities/Nombre';

export const generateRandomNumber = (): Nombre => {
  const random = Math.floor(Math.random() * 10000) + 1;
  return new Nombre(random);
};
