import { Controller, Get, Post, Req } from '@nestjs/common'
import { MessageDBService } from 'database/service/message.db.service'
import type { Request } from 'express'
import { ChatGateway } from './chat.gateway'

@Controller()
export class ChatController {
  constructor(
    private readonly wsServer: ChatGateway,
    private readonly messageService: MessageDBService,
  ) { }

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }

  @Get('messages')
  findAll() {
    return this.messageService.findAll()
  }

  @Post('messages')
  postMessage(@Req() request: Request) {
    console.log(request.params)
    return 'hello world'
  }
}
