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
  name: string;
  point: number;
  multiplier: number;
}

export interface RoundTableProps {
  users: User[];
}
