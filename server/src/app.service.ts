import { Injectable } from '@nestjs/common';
import { ResultType } from '@prisma/client';
import { users } from './mockData';
import { PrismaService } from './prisma/prisma.service';
import {
  PlaceBetDto,
  RegisterUserDto,
  RoundStartedResponse,
  RoundUpdatedResponse,
  UsersUpdatedResponse,
} from './types';
import { generateRandomNumber } from './utils/generateRandomNumber';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getRoundPlayers(roundId: string) {
    return this.prisma.roundPlayer.findMany({
      where: {
        roundId,
      },
      include: {
        round: true,
        user: true,
      },
    });
  }

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
          score: 1000,
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

      return {
        newUser,
        roundPlayers: await this.getRoundPlayers(newRound.id),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async placeBet(data: PlaceBetDto): Promise<RoundStartedResponse> {
    try {
      const roundId = data.roundId;

      // Update multiplier and points for user
      await this.prisma.roundPlayer.update({
        where: {
          roundId_userId: {
            roundId,
            userId: data.userId,
          },
        },
        data: {
          multiplier: data.multiplier,
          points: data.points,
          user: {
            connect: {
              id: data.userId,
            },
            update: {
              score: {
                decrement: data.points,
              },
            },
          },
        },
      });

      // Update start time for round
      const round = await this.prisma.round.update({
        where: {
          id: roundId,
        },
        data: {
          startTime: new Date(),
          status: 'IN_PROGRESS',
        },
      });

      return {
        randomMultiplier: round.randomMultiplier,
        roundPlayers: await this.getRoundPlayers(roundId),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async endRound(roundId: string): Promise<RoundUpdatedResponse[]> {
    try {
      // 1. Find a round with players
      const round = await this.prisma.round.findUnique({
        where: {
          id: roundId,
        },
        include: {
          roundPlayers: true,
        },
      });

      if (!round) {
        throw new Error(`Round with ID ${roundId} not found`);
      }

      const { randomMultiplier, roundPlayers } = round;

      if (!roundPlayers.length) {
        throw new Error('No round players');
      }

      // 2. Calculate the results for each player
      const updates = roundPlayers.map((player) => {
        const multiplierAndPoints = player.multiplier * player.points;
        const result: ResultType =
          player.multiplier <= randomMultiplier
            ? ResultType.WON
            : ResultType.LOST;

        // 3. Update the result
        return this.prisma.roundPlayer.update({
          where: {
            id: player.id,
          },
          data: {
            result: result as ResultType,
            ...(result === ResultType.WON && {
              user: {
                connect: {
                  id: player.userId,
                },
                update: {
                  score: {
                    increment: multiplierAndPoints,
                  },
                },
              },
            }),
          },
        });
      });

      // 4. Update the result of each player
      await this.prisma.$transaction(updates);

      // 5. End the round by updating its completion time
      await this.prisma.round.update({
        where: {
          id: roundId,
        },
        data: {
          endTime: new Date(),
          status: 'COMPLETED',
        },
      });

      // 6. Return players with updated results
      return this.getRoundPlayers(roundId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
