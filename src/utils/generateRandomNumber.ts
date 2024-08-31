import { maxRandomValue, minRandomValue } from '../../data';

export const generateRandomNumber = () => {
  const randomValue =
    Math.random() * (maxRandomValue - minRandomValue) + minRandomValue;
  const roundedValue = randomValue.toFixed(2);
  return parseFloat(roundedValue);
};
