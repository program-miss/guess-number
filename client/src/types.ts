export interface HeaderInputProps {
  type: 'points' | 'multiplier';
  step: number;
  defaultValue?: number;
}

export interface HeaderImageTextProps {
  image: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  points: number;
  multiplier: number;
}

export interface RoundData {
  id: string;
  crashValue: number;
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

export interface TableProps<T> {
  columns: Column[];
  items: T[];
  getCellData: (item: T, columnKey: string) => React.ReactNode;
  hasNo?: boolean;
}
