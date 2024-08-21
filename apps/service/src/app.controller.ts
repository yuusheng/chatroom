import { Body, Controller, Post } from '@nestjs/common';
import { PusherService } from './pusher/pusher.service';

@Controller('api')
export class AppController {
  constructor(private pusherService: PusherService) {}

  @Post('messages')
  async messages(
    @Body('username') username: string,
    @Body('message') message: string,
    @Body('id') id: number
  ) {
    await this.pusherService.trigger('chat', 'message', { username, message, id })

    return []
  }
}
