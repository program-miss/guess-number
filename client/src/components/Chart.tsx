import React, { useEffect, useState } from 'react';
import { ChartProps } from '../types';

const Chart: React.FC<ChartProps> = ({ number }) => {
  const [currentValue, setCurrentValue] = useState('0.00');

  useEffect(() => {
    let start: number | null = null;
    const duration = 5000; // 5 seconds
    const startValue = 0;
    const endValue = number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const value = Math.min(
        startValue + (progress / duration) * (endValue - startValue),
        endValue
      );
      setCurrentValue(value.toFixed(2));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [number]);

  return (
    <div className="chartBox">
      <div className={parseFloat(currentValue) === number ? 'pink' : ''}>
        {currentValue}x
      </div>
    </div>
  );
};

export default Chart;
