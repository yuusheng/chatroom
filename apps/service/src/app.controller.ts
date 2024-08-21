import { Body, Controller, Get, Post } from '@nestjs/common'
import { PusherService } from './pusher/pusher.service'
import { ChatGateway } from './chat/chat.gateway'

@Controller('api')
export class AppController {
  constructor(
    private pusherService: PusherService,
    private wsServer: ChatGateway
  ) {}

  @Post('messages')
  async messages(
    @Body('username') username: string,
    @Body('message') message: string,
    @Body('id') id: number
  ) {
    await this.pusherService.trigger('chat', 'message', { username, message, id })

    return []
  }

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }
}
