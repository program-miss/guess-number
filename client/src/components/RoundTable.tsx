import { useGameContext } from '@/context/GameContext';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { columnsRoundTable as columns, serverUrl } from '../../data';
import { RoundTableProps, User } from '../types';

const socket = io(serverUrl);

const RoundTable: React.FC<RoundTableProps> = () => {
  const { users, myData, roundData, setUsers } = useGameContext();

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

        if (!roundData && columnKey !== 'name') {
          return '-';
        }

        return user[columnKey as keyof User];
      },
    [myData, roundData]
  );

  useEffect(() => {
    socket.on('round-updated', (usersFromDB: User[]) => {
      console.log('usersFromDB', usersFromDB);
      setUsers(usersFromDB);
    });

    return () => {
      socket.off('round-updated');
    };
  }, []);

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
