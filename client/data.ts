export const users = [
  {
    id: '1',
    name: 'Thomas',
    points: 100,
    multiplier: 2.15,
    score: 215,
  },
  {
    id: '2',
    name: 'Alex',
    points: 100,
    multiplier: 7.53,
    score: 753,
  },
  {
    id: '3',
    name: 'Dima',
    points: 100,
    multiplier: 1.27,
    score: 127,
  },
  {
    id: '4',
    name: 'John',
    points: 100,
    multiplier: 6.84,
    score: 684,
  },
  {
    id: '5',
    name: 'Rita',
    points: 100,
    multiplier: 9.75,
    score: 0,
  },
];

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

export const columnsRoundTable = [
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
