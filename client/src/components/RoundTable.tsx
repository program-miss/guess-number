import { useGameContext } from '@/context/GameContext';
import Table from '@/ui/Table';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { columnsRoundTable as columns, serverUrl } from '../../data';
import { User } from '../types';

const socket = io(serverUrl);

const RoundTable: React.FC = () => {
  const { myData, roundData, setUsers } = useGameContext();

  const users = roundData?.users || [];
  const sortedUsers = useMemo(
    () =>
      myData
        ? [myData, ...users.filter((user) => user.id !== myData.id)]
        : users,
    [users, myData]
  );

  const getCellData = (user: User, columnKey: string): string | number => {
    if (columnKey === 'name' && user.id === myData?.id) {
      return 'You';
    }

    if (!roundData && columnKey !== 'name') {
      return '-';
    }

    return user[columnKey as keyof User];
  };

  useEffect(() => {
    socket.on('round-updated', (usersFromDB: User[]) => {
      setUsers(usersFromDB);
    });

    return () => {
      socket.off('round-updated');
    };
  }, []);

  return (
    <Table columns={columns} items={sortedUsers} getCellData={getCellData} />
  );
};

export default RoundTable;
