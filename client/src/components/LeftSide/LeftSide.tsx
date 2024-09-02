import { useGameContext } from '@/context/GameContext';
import {
  RoundData,
  RoundStartedResponse,
  RoundStatusType,
  User,
} from '@/types';
import Button from '@/ui/Button/Button';
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
  const {
    points,
    multiplier,
    myData,
    roundData,
    setRoundData,
    setTableData,
    setMyData,
  } = useGameContext();

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
      // Update score for my data
      const me = roundData.roundPlayers.find(
        (user) => user.user.id === myData?.id
      );

      if (me && me.user.score !== myData?.score) {
        setMyData((prev: User) => ({
          ...prev,
          score: me.user.score ?? prev.score,
        }));
      }

      // Update table data
      setTableData(roundData.roundPlayers);
      setRoundData((prev: RoundData) => ({
        ...prev,
        randomMultiplier: roundData.randomMultiplier,
        status: roundData.roundPlayers[0].round.status,
      }));
    });

    return () => {
      socket.off('round-started');
    };
  }, [setRoundData, myData?.id]);

  return (
    <div className={styles.leftSideContainer}>
      {myData?.name ? (
        <div className={styles.container}>
          <div className={styles.inputs}>
            <HeaderInput type="points" step={25} />
            <HeaderInput type="multiplier" step={0.25} />
          </div>
          <div className={`${styles.buttonTableContainer} ${styles.container}`}>
            <Button
              text={
                roundData?.status === RoundStatusType.IN_PROGRESS
                  ? 'Started'
                  : 'Start'
              }
              onClick={handleStart}
              disabled={roundData?.status === RoundStatusType.IN_PROGRESS}
            />
            <div className={styles.roundTableContainer}>
              <ImageLabel image="trophy" text="Current Round" />
              <RoundTable />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <Welcome />
        </div>
      )}
    </div>
  );
};

export default LeftSide;
