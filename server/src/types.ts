import { User } from '@prisma/client';

export interface RegisterUserDto {
  id: string;
  name: string;
}

interface UserInRound {
  id: string;
  name: string;
}

interface Round {
  id: string;
  users: UserInRound[];
}

export interface UsersUpdatedResponse {
  newUser: User;
  round: Round;
}
