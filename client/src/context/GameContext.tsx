import { RoundData, RoundPlayer, User } from '@/types';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface GameContextProps {
  points: number;
  setPoints: (points: number) => void;
  multiplier: number;
  setMultiplier: (multiplier: number) => void;
  myData: User | null;
  setMyData: (myData: any) => void;
  roundData: RoundData | null;
  setRoundData: (roundData: any) => void;
  tableData: RoundPlayer[];
  setTableData: (data: RoundPlayer[]) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState<number>(50);
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [myData, setMyData] = useState<User | null>(null);
  const [tableData, setTableData] = useState<RoundPlayer[]>([]);
  const [roundData, setRoundData] = useState<RoundData | null>(null);

  return (
    <GameContext.Provider
      value={{
        points,
        setPoints,
        multiplier,
        setMultiplier,
        myData,
        setMyData,
        roundData,
        setRoundData,
        tableData,
        setTableData,
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
