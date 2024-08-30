import { HeaderInputProps } from '@/types';
import React, { useState } from 'react';

const HeaderInput: React.FC<HeaderInputProps> = ({
  label,
  step,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  const handleIncrement = () => {
    setValue((prevValue) => parseFloat((prevValue + step).toFixed(2)));
  };

  const handleDecrement = () => {
    setValue((prevValue) => parseFloat((prevValue - step).toFixed(2)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue) {
      setValue(parseFloat(newValue));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <small>{label}</small>
      <div>
        <button onClick={handleDecrement}>▼</button>
        <input type="number" value={value} onChange={handleChange} />
        <button onClick={handleIncrement}>▲</button>
      </div>
    </div>
  );
};

export default HeaderInput;
