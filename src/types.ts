export interface HeaderInputProps {
  label: string;
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
