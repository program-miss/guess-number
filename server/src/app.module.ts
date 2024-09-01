import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SocketGateway } from './socket.gateway';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  providers: [AppService, SocketGateway, PrismaService],
})
export class AppModule {}
