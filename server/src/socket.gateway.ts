import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { config } from 'dotenv';
import { Server } from 'socket.io';
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

  @SubscribeMessage('start')
  handleStart(
    @MessageBody() data: { points: number; multiplier: number },
  ): void {
    const crashValue = generateRandomNumber();
    // Save points and multiplier to the DB
    this.server.emit('crashValue', crashValue);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('Message received:', message);
    // Save message to the DB
    this.server.emit('message', message);
  }

  @SubscribeMessage('name')
  handleAcceptName(@MessageBody() name: string): void {
    // Save name to the DB
    this.server.emit('name', name);
  }
}
