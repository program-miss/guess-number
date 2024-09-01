import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { AppService } from './app.service';
import { users } from './mockData';
import { RegisterUserDto } from './types';
import { generateRandomNumber } from './utils/generateRandomNumber';
config();

const clientUrl = process.env.CLIENT_URL || '';

@WebSocketGateway({
  cors: {
    origin: clientUrl,
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('register-user')
  async handleRegisterUser(
    @MessageBody() userData: RegisterUserDto,
  ): Promise<void> {
    if (!userData.name || !userData.id) return;
    const roundData = await this.appService.createRoundWithUser(userData);
    this.server.emit('users-updated', roundData);
  }

  @SubscribeMessage('place-bet')
  handleStart(
    @MessageBody() data: { points: number; multiplier: number },
  ): void {
    const roundData = {
      id: uuidv4(),
      crashValue: generateRandomNumber(),
    };
    this.server.emit('round-started', roundData);
  }

  @SubscribeMessage('send-chat-message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Message received:', message);
    this.server.emit('chat-message-received', message);
  }

  @SubscribeMessage('end-round')
  handleRoundEnd(@MessageBody() roundId: string): void {
    if (!roundId) return;
    // Send users for tables
    this.server.emit('round-updated', users);
  }
}
