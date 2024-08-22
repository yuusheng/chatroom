import { Controller, Get } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'

@Controller('api')
export class ChatController {
  constructor(
    private readonly wsServer: ChatGateway,
  ) {}

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }
}
