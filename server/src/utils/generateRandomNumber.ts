export const generateRandomNumber = () => {
  const maxRandomValue = 10;
  const minRandomValue = 0;
  const randomValue =
    Math.random() * (maxRandomValue - minRandomValue) + minRandomValue;
  const roundedValue = randomValue.toFixed(2);
  return parseFloat(roundedValue);
};
