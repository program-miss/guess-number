import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { serverUrl } from '../../data';
import Button from '../ui/Button';

const socket = io(serverUrl);

const Welcome: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const { setUsers, setMyData } = useGameContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRegisterUser = () => {
    if (!value) return;
    socket.emit('register-user', value);
  };

  useEffect(() => {
    socket.on('users-updated', ({ newUser, users }) => {
      setUsers(users);
      setMyData(newUser);
    });

    return () => {
      socket.off('users-updated');
    };
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
