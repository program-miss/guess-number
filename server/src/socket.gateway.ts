import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { users } from './mockData';
import { generateRandomNumber } from './utils/generateRandomNumber';
config();

const clientUrl = process.env.CLIENT_URL || '';

@WebSocketGateway({
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST'],
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

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

  @SubscribeMessage('register-user')
  handleRegisterUser(@MessageBody() name: string): void {
    if (!name) return;
    const newUser = {
      name,
      id: uuidv4(),
      points: 50,
      multiplier: 1,
    };
    users.push(newUser);

    // Send users for table Current round
    this.server.emit('users-updated', { newUser, users });
  }

  @SubscribeMessage('end-round')
  handleRoundEnd(@MessageBody() roundId: string): void {
    if (!roundId) return;
    // Send users for tables
    this.server.emit('round-updated', users);
  }
}
