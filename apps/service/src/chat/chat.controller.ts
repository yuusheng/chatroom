import { Controller, Get } from '@nestjs/common'
import type { MessageDBService } from 'database/service/message.db.service'
import type { ChatGateway } from './chat.gateway'

@Controller()
export class ChatController {
  constructor(
    private readonly wsServer: ChatGateway,
    private readonly messageService: MessageDBService,
  ) {}

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }

  @Get('messages')
  findAll() {
    return this.messageService.findAll()
  }
}
