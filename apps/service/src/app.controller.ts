import { Controller, Get } from '@nestjs/common'
import { ChatGateway } from './chat/chat.gateway'

@Controller('api')
export class AppController {
  constructor(
    private wsServer: ChatGateway
  ) {}

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }
}
