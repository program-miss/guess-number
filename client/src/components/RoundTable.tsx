import { useGameContext } from '@/context/GameContext';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
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

        if (
          !crashValue &&
          (columnKey === 'points' || columnKey === 'multiplier')
        ) {
          return '-';
        }

        return getKeyValue(user, columnKey);
      },
    [myData, crashValue]
  );

  return (
    <Table aria-label="current round table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={sortedUsers}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => (
              <TableCell>{getCellData(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RoundTable;
