import { useGameContext } from '@/context/GameContext';
import Table from '@/ui/Table';
import { columnsRankingTable as columns } from '../../data';
import { User } from '../types';

const RankingTable: React.FC = () => {
  const { users, myData, roundData } = useGameContext();

  // Fill the array up to 5 elements
  const extendedUsers = [...users];
  while (extendedUsers.length < 5) {
    extendedUsers.push({
      id: `placeholder-${extendedUsers.length + 1}`,
      name: '-',
      points: '-',
      multiplier: '-',
    } as unknown as User);
  }

  const getCellData = (user: User, columnKey: string): string | number => {
    if (user.id.startsWith('placeholder')) {
      return '-';
    }

    if (columnKey === 'name' && user.id === myData?.id) {
      return 'You';
    }

    if (!roundData && columnKey !== 'name') {
      return '-';
    }

    return user[columnKey as keyof User];
  };

  return (
    <Table
      columns={columns}
      items={extendedUsers}
      getCellData={getCellData}
      hasNo
    />
  );
};

export default RankingTable;
