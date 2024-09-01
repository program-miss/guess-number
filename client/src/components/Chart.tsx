import { useGameContext } from '@/context/GameContext';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { serverUrl } from '../../data';
import { ChartProps } from '../types';

const socket = io(serverUrl);

const Chart: React.FC<ChartProps> = ({ number }) => {
  const [currentValue, setCurrentValue] = useState('0.00');
  const { roundData } = useGameContext();

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
      } else {
        // When the animation is complete and the value has reached the end

        socket.emit('end-round', roundData?.id);
      }
    };

    requestAnimationFrame(animate);
  }, [number, roundData?.id]);

  return (
    <div className="chartBox">
      <div className={parseFloat(currentValue) === number ? 'pink' : ''}>
        {currentValue}x
      </div>
    </div>
  );
};

export default Chart;
