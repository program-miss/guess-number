import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { serverUrl } from '../../data';
import Button from '../ui/Button';

const socket = io(serverUrl);

const Welcome: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { myData, setMyData, setRoundData } = useGameContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRegisterUser = () => {
    if (!value) return;
    socket.emit('register-user', { id: myData?.id, name: value });
  };

  useEffect(() => {
    socket.on('users-updated', ({ newUser, round }) => {
      // Save user and round data
      setRoundData(round);
      if (myData?.id === newUser.id) setMyData(newUser);
    });

    return () => {
      socket.off('users-updated');
    };
  }, [setRoundData, setMyData, myData]);

  useEffect(() => {
    // Create new user and save to the context
    const newUserId = uuidv4();
    setMyData({ id: newUserId, name: '', score: 0 });
  }, []);

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
