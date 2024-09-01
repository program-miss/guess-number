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

export interface StartRoundUsers {
  id: string;
  name: string;
}

export interface RoundData {
  id: string;
  users: StartRoundUsers[];
  // crashValue?: number;
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
