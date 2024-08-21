import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PusherService } from './pusher/pusher.service'
import { ChatModule } from './chat/chat.module'

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [PusherService],
})
export class AppModule  {}
