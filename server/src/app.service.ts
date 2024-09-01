import { Injectable } from '@nestjs/common';
import { users } from './mockData';
import { PrismaService } from './prisma/prisma.service';
import { RegisterUserDto, UsersUpdatedResponse } from './types';
import { generateRandomNumber } from './utils/generateRandomNumber';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createRoundWithUser(
    userData: RegisterUserDto,
  ): Promise<UsersUpdatedResponse> {
    try {
      // Create new user in the DB
      const newUserId = userData.id;
      const newUser = await this.prisma.user.create({
        data: {
          id: newUserId,
          name: userData.name,
        },
      });

      // Get relevant data from mock users
      const mockUsersData = users.map((user) => {
        return {
          userId: user.id,
          multiplier: user.multiplier,
          points: user.points,
        };
      });

      // Create new round and add new round playes
      const newRound = await this.prisma.round.create({
        data: {
          roundPlayers: {
            createMany: {
              data: [
                {
                  userId: newUserId,
                  multiplier: 1,
                  points: 50,
                },
                ...mockUsersData,
              ],
            },
          },
          randomMultiplier: generateRandomNumber(),
        },
      });

      // Get users in 1 round
      const usersInRound = await this.prisma.user.findMany({
        where: {
          roundPlayers: {
            some: {
              roundId: newRound.id,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      return {
        newUser,
        round: {
          id: newRound.id,
          users: usersInRound,
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }
}
