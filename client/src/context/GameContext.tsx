import React, { ReactNode, createContext, useContext, useState } from 'react';

interface GameContextProps {
  points: number;
  setPoints: (points: number) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  name: string;
  setName: (name: string) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [name, setName] = useState<string>('');

  return (
    <GameContext.Provider
      value={{
        points,
        setPoints,
        multiplier,
        setMultiplier,
        name,
        setName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameContextProvider');
  }
  return context;
};
