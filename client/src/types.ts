export interface HeaderInputProps {
  type: 'points' | 'multiplier';
  step: number;
  defaultValue?: number;
}

export interface HeaderImageTextProps {
  image: string;
  text: string | undefined;
}

export interface User {
  id: string;
  name: string;
  score: number;
}

interface IdNameUser {
  id: string;
  name: string;
}

export interface RoundUpdatedResponse {
  result?: ResultType;
  points: number;
  multiplier: number;
  round: Round;
  user: User;
}

export interface UsersUpdatedResponse {
  newUser: User;
  roundPlayers: RoundPlayer[];
}

export interface RoundData {
  id: string;
  randomMultiplier?: number;
  status: RoundStatusType;
}

export interface ChartProps {
  number: number;
}

export interface ImageLabelProps {
  image: string;
  text: string;
}

export interface ButtonProps {
  text: string;
  onClick: () => void;
}

export interface Column {
  key: string;
  label: string;
}

export interface TableProps {
  columns: Column[];
  items: any;
  getCellData: (item: any, columnKey: string) => React.ReactNode;
  hasNo?: boolean;
}

interface Round {
  id: string;
  status: RoundStatusType;
}

export interface RoundPlayer {
  points: number;
  multiplier: number;
  result?: ResultType;
  round: Round;
  user: User;
}

export interface RoundStartedResponse {
  randomMultiplier: number;
  roundPlayers: RoundPlayer[];
}

export interface UserRoundTable {
  user: IdNameUser;
}

// Enums
export enum ResultType {
  WON = 'WON',
  LOST = 'LOST',
}

export enum RoundStatusType {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
