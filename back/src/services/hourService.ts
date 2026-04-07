import { Hour } from '../domain/entities/Hour';

export const generateRandomHour = (): Hour => {
  return Hour.factoryRandom();
};
