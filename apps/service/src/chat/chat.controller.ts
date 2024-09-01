import { Controller, Get } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { MessageDBService } from 'database/service/message.db.service'

@Controller()
export class ChatController {
  constructor(
    private readonly wsServer: ChatGateway,
    private readonly messageService: MessageDBService
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
