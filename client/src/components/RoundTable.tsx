import { useGameContext } from '@/context/GameContext';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { columnsRoundTable as columns, serverUrl } from '../../data';
import {
  ResultType,
  RoundData,
  RoundStatusType,
  RoundUpdatedResponse,
  User,
} from '../types';

const socket = io(serverUrl);

const RoundTable: React.FC = () => {
  const {
    myData,
    setMyData,
    roundData,
    setRoundData,
    tableData,
    setTableData,
  } = useGameContext();

  const getCellData = useMemo(() => {
    return (user: any, columnKey: string): string | number => {
      if (columnKey === 'name' && user.user.id === myData?.id) {
        return 'You';
      }

      if (
        roundData?.status === RoundStatusType.NOT_STARTED &&
        columnKey !== 'name'
      ) {
        return '-';
      }

      return (
        user[columnKey as keyof User] ||
        user.user[columnKey as keyof User] ||
        '-'
      );
    };
  }, [myData?.id, roundData?.status]);

  const getClassName = (item: any): string => {
    if (item.round.status === RoundStatusType.COMPLETED) {
      return item.result === ResultType.WON ? 'td won' : 'td lost';
    }
    return 'td';
  };

  useEffect(() => {
    socket.on(
      'round-updated',
      (roundUpdatedResponse: RoundUpdatedResponse[]) => {
        roundUpdatedResponse.forEach((data) => {
          if (data.user.id === myData?.id) {
            setMyData((prev: User) => ({
              ...prev,
              score: data.user.score,
            }));
          }
        });

        setTableData(roundUpdatedResponse);
        setRoundData((prev: RoundData) => ({
          ...prev,
          status: roundUpdatedResponse[0].round.status,
        }));
      }
    );

    return () => {
      socket.off('round-updated');
    };
  }, []);

  return (
    <table className="table">
      <thead className="thead">
        <tr className="tr">
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {tableData.map((item: any, index: number) => (
          <tr key={item.id || `empty-${index}`} className="tr">
            {columns.map((column) => (
              <td key={column.key} className={getClassName(item)}>
                {getCellData(item, column.key)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoundTable;
