import { ChartProps } from '../types';

const Chart: React.FC<ChartProps> = ({ number }) => {
  return <div>{number}x</div>;
};

export default Chart;
