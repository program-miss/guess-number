import { useGameContext } from '@/context/GameContext';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import React from 'react';
import { HeaderInputProps } from '../../types';

const HeaderInput: React.FC<HeaderInputProps> = ({
  type,
  step,
  defaultValue = 0,
}) => {
  const { points, setPoints, multiplier, setMultiplier } = useGameContext();

  const value = type === 'points' ? points : multiplier;
  const setValue = type === 'points' ? setPoints : setMultiplier;

  const handleIncrement = () => {
    setValue(parseFloat((value + step).toFixed(2)));
  };

  const handleDecrement = () => {
    setValue(parseFloat((value - step).toFixed(2)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      setValue(parseFloat(newValue));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <small>{capitalizeFirstLetter(type)}</small>
      <div>
        <button onClick={handleDecrement}>▼</button>
        <input type="number" value={value} onChange={handleChange} />
        <button onClick={handleIncrement}>▲</button>
      </div>
    </div>
  );
};

export default HeaderInput;
