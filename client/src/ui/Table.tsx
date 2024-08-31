import { TableProps } from '@/types';

const Table = <T extends { id: string }>({
  columns,
  items,
  getCellData,
  hasNo = false,
}: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {hasNo && <th>No.</th>}
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            {hasNo && <td>{index + 1}</td>}
            {columns.map((column) => (
              <td key={column.key}>{getCellData(item, column.key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
