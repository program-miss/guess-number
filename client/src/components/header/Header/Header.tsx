import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import ImageText from '../HeaderImageText/HeaderImageText';
import HeaderInput from '../HeaderInput/HeaderInput';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { myData } = useGameContext();

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
    <header className={styles.container}>
      {myData?.name && (
        <>
          <HeaderInput type="points" step={25} />
          <HeaderInput type="multiplier" step={0.25} />
        </>
      )}
      <ImageText
        image="/medal.png"
        text={myData?.name && !myData.score ? 1000 : 0}
      />
      <ImageText image="/user.png" text={myData?.name || ''} />
      <ImageText image="/clock.png" text={myData?.name ? currentTime : ''} />
    </header>
  );
};

export default Header;
