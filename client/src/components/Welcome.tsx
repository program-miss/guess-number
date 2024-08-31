import { useGameContext } from '@/context/GameContext';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { serverUrl } from '../../data';
import Button from '../ui/Button';

const socket = io(serverUrl);

const Welcome: React.FC = () => {
  const { setName } = useGameContext();
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAcceptName = () => {
    socket.emit('name', value);
  };

  useEffect(() => {
    socket.on('name', (message: string) => {
      setName(message);
    });

    return () => {
      socket.off('name');
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <label>Please Insert Your Name</label>
        <input value={value} onChange={handleChange} />
        <Button text="Accept" onClick={handleAcceptName} />
      </div>
    </div>
  );
};
export default Welcome;
