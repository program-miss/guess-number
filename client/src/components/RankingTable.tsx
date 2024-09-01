import { useGameContext } from '@/context/GameContext';
import { useEffect, useMemo, useState } from 'react';
import { columnsRankingTable as columns } from '../../data';
import { RoundStatusType, User } from '../types';

const RankingTable: React.FC = () => {
  const { tableData, myData, roundData } = useGameContext();
  const [users, setUsers] = useState<any>([]);

  const getCellData = useMemo(() => {
    return (user: any, columnKey: string): string | number => {
      if (
        columnKey === 'name' &&
        user.user?.id === myData?.id &&
        roundData?.status === RoundStatusType.COMPLETED
      ) {
        return 'You';
      }

      if (
        roundData?.status === RoundStatusType.NOT_STARTED ||
        roundData?.status === RoundStatusType.IN_PROGRESS
      ) {
        return '-';
      }

      return (
        (user?.[columnKey as keyof User] ||
          user?.user?.[columnKey as keyof User]) ??
        '-'
      );
    };
  }, [myData?.id, roundData?.status]);

  useEffect(() => {
    let emptyUsers = [];
    for (let i = 0; i < 6; i++) {
      emptyUsers.push({ no: i });
    }

    const currectTableData = tableData.length ? tableData : emptyUsers;

    setUsers(currectTableData);
  }, [tableData]);

  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((item: any, index: number) => (
          <tr key={item.id || `empty-${index}`}>
            <td>{index + 1}</td>
            {columns.map((column) => (
              <td key={column.key}>{getCellData(item, column.key)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingTable;
