import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import Chart from '../Chart/Chart';
import HeaderImageText from '../header/HeaderImageText/HeaderImageText';
import styles from './RightSide.module.css';

const RightSide: React.FC = () => {
  const { myData, roundData } = useGameContext();

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}.${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000); // Update the time every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <HeaderImageText
          image="/medal.png"
          text={myData?.name && !myData.score ? 1000 : 0}
        />
        <HeaderImageText image="/user.png" text={myData?.name || ''} />
        <HeaderImageText
          image="/clock.png"
          text={myData?.name ? currentTime : ''}
        />
      </div>

      <Chart number={roundData?.randomMultiplier || 0} />
    </div>
  );
};

export default RightSide;
