import { useGameContext } from '@/context/GameContext';
import { UsersUpdatedResponse } from '@/types';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { serverUrl } from '../../data';
import Button from '../ui/Button';

const socket = io(serverUrl);

const Welcome: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { myData, setMyData, setRoundData, setTableData } = useGameContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRegisterUser = () => {
    if (!value) return;
    socket.emit('register-user', { id: myData?.id, name: value });
  };

  useEffect(() => {
    socket.on('users-updated', (roundData: UsersUpdatedResponse) => {
      // Save user and round data
      const { roundPlayers, newUser } = roundData;
      setRoundData({
        id: roundPlayers[0].round.id,
        status: roundPlayers[0].round.status,
      });
      setTableData(roundPlayers);
      if (myData?.id === newUser.id) {
        setMyData(newUser);
      }
    });

    return () => {
      socket.off('users-updated');
    };
  }, [setRoundData, setTableData, setMyData, myData]);

  useEffect(() => {
    // Create new user and save to the context
    const newUserId = uuidv4();
    setMyData({ id: newUserId, name: '', score: 0 });
  }, [setMyData]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <label>Please Insert Your Name</label>
        <input value={value} onChange={handleChange} />
        <Button text="Accept" onClick={handleRegisterUser} />
      </div>
    </div>
  );
};
export default Welcome;
