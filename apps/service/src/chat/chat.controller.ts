import { Controller, Get } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'

@Controller('api')
export class ChatController {
  constructor(
    private wsServer: ChatGateway
  ) {}

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }
}
