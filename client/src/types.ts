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
  no: number;
  name: string;
  point: number;
  multiplier: number;
  score: number;
}

export interface RoundTableProps {
  users: User[];
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
