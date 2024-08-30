import { RoundTableProps } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';

const columns = [
  {
    key: 'no',
    label: 'No.',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'score',
    label: 'Score',
  },
];

const RankingTable: React.FC<RoundTableProps> = ({ users }) => {
  const sortedUsers = users.sort((a, b) => b.score - a.score);

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={sortedUsers}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(user, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
