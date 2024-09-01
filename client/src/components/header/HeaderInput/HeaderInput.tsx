import { useGameContext } from '@/context/GameContext';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import React from 'react';
import { HeaderInputProps } from '../../../types';
import styles from './HeaderInput.module.css';

const HeaderInput: React.FC<HeaderInputProps> = ({ type, step }) => {
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
    <div className={styles.container}>
      <small className="small">{capitalizeFirstLetter(type)}</small>
      <div className={styles.buttonsInputContainer}>
        <button onClick={handleDecrement} className={styles.button}>
          ▼
        </button>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className={styles.input}
        />
        <button onClick={handleIncrement} className={styles.button}>
          ▲
        </button>
      </div>
    </div>
  );
};

export default HeaderInput;
