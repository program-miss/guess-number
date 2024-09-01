import { useGameContext } from '@/context/GameContext';
import { RoundData, RoundStartedResponse } from '@/types';
import Button from '@/ui/Button';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { serverUrl } from '../../../data';
import ImageLabel from '../ImageLabel';
import RoundTable from '../RoundTable';
import Welcome from '../Welcome/Welcome';
import HeaderInput from '../header/HeaderInput/HeaderInput';
import styles from './LeftSide.module.css';

const socket = io(serverUrl);

const LeftSide: React.FC = () => {
  const { points, multiplier, myData, roundData, setRoundData, setTableData } =
    useGameContext();

  const handleStart = () => {
    socket.emit('place-bet', {
      points,
      multiplier,
      userId: myData?.id,
      roundId: roundData?.id,
    });
  };

  useEffect(() => {
    socket.on('round-started', (roundData: RoundStartedResponse) => {
      setRoundData((prev: RoundData) => ({
        ...prev,
        randomMultiplier: roundData.randomMultiplier,
        status: roundData.roundPlayers[0].round.status,
      }));

      setTableData(roundData.roundPlayers);
    });

    return () => {
      socket.off('round-started');
    };
  }, [setRoundData]);

  return (
    <div className={styles.containerWithWelcome}>
      {myData?.name ? (
        <div className={styles.container}>
          <div className={styles.inputs}>
            <HeaderInput type="points" step={25} />
            <HeaderInput type="multiplier" step={0.25} />
          </div>
          <div className={`${styles.buttonTableContainer} ${styles.container}`}>
            <Button text="Start" onClick={handleStart} />
            <div className={styles.roundTableContainer}>
              <ImageLabel image="trophy" text="Current Round" />
              <RoundTable />
            </div>
          </div>
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default LeftSide;
