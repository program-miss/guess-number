import { ResultType, Round, User } from '@prisma/client';

export interface RegisterUserDto {
  id: string;
  name: string;
}

export interface UsersUpdatedResponse {
  newUser: User;
  roundPlayers: RoundPlayer[];
}

export interface PlaceBetDto {
  points: number;
  multiplier: number;
  userId: string;
  roundId: string;
}

interface RoundPlayer {
  points: number;
  multiplier: number;
  round: Round;
  user: RegisterUserDto;
}

export interface RoundStartedResponse {
  randomMultiplier: number;
  roundPlayers: RoundPlayer[];
}

export interface RoundUpdatedResponse {
  result: ResultType | null;
  points: number;
  multiplier: number;
  round: Round;
  user: User;
}

export interface MessageDataDto {
  message: string;
  userId: string;
  roundId: string;
}
