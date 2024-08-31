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
    key: 'name',
    label: 'Name',
  },
  {
    key: 'point',
    label: 'Point',
  },
  {
    key: 'multiplier',
    label: 'Multiplier',
  },
];

const RoundTable: React.FC<RoundTableProps> = ({ users }) => {
  return (
    <Table aria-label="current round table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users}>
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

export default RoundTable;
