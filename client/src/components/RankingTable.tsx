import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import { RoundTableProps } from '../types';

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
  return (
    <Table aria-label="ranking table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) =>
              columnKey === 'no' ? (
                <TableCell>index</TableCell>
              ) : (
                <TableCell>{getKeyValue(user, columnKey)}</TableCell>
              )
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RankingTable;
