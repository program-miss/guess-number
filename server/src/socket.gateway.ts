import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { config } from 'dotenv';
import { Server } from 'socket.io';
import { AppService } from './app.service';
import {
  PlaceBetDto,
  RegisterUserDto,
  RoundStartedResponse,
  RoundUpdatedResponse,
  UsersUpdatedResponse,
} from './types';
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
    const roundData: UsersUpdatedResponse =
      await this.appService.createRoundWithUser(userData);
    this.server.emit('users-updated', roundData);
  }

  @SubscribeMessage('place-bet')
  async handleStart(@MessageBody() data: PlaceBetDto): Promise<void> {
    const roundData: RoundStartedResponse =
      await this.appService.placeBet(data);
    this.server.emit('round-started', roundData);
  }

  @SubscribeMessage('end-round')
  async handleRoundEnd(@MessageBody() roundId: string): Promise<void> {
    if (!roundId) return;
    const users: RoundUpdatedResponse[] =
      await this.appService.endRound(roundId);
    this.server.emit('round-updated', users);
  }

  @SubscribeMessage('send-chat-message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Message received:', message);
    this.server.emit('chat-message-received', message);
  }
}
