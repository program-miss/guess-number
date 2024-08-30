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
    <Table>
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
