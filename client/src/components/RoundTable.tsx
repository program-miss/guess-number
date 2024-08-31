import { useGameContext } from '@/context/GameContext';
import { useMemo } from 'react';
import { RoundTableProps, User } from '../types';

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'points',
    label: 'Points',
  },
  {
    key: 'multiplier',
    label: 'Multiplier',
  },
];

const RoundTable: React.FC<RoundTableProps> = () => {
  const { users, myData, crashValue } = useGameContext();

  const sortedUsers = useMemo(
    () =>
      myData
        ? [myData, ...users.filter((user) => user.id !== myData.id)]
        : users,
    [users, myData]
  );

  const getCellData = useMemo(
    () =>
      (user: User, columnKey: any): string | number => {
        if (columnKey === 'name' && user.id === myData?.id) {
          return 'You';
        }

        if (!crashValue && columnKey !== 'name') {
          return '-';
        }

        return user[columnKey as keyof User];
      },
    [myData, crashValue]
  );

  return (
    <table aria-label="current round table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            {columns.map((column) => (
              <td key={column.key}>{getCellData(user, column.key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoundTable;
