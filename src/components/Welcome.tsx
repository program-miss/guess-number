import Button from '@/ui/Button';
import { useState } from 'react';

const Welcome: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Welcome</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <label>Please Insert Your Name</label>
        <input value={value} onChange={handleChange} />
        <Button text="Accept" onClick={() => {}} />
      </div>
    </div>
  );
};
export default Welcome;
