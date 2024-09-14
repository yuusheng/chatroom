import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { MessageDBService } from 'database/service/message.db.service'
import { AuthGuard } from 'user/auth/auth.guard'
import { InsertMessage } from 'database/schema'
import { UserService } from 'user/user.service'
import { ChatGateway } from './chat.gateway'

@Controller()
export class ChatController {
  constructor(
    private readonly wsServer: ChatGateway,
    private readonly messageService: MessageDBService,
    private readonly userService: UserService,
  ) { }

  @Get('online/count')
  async getWsConnectionCount() {
    return this.wsServer.count
  }

  @Get('messages')
  async findAll() {
    const messages = await this.messageService.findAll()
    return messages
  }

  @UseGuards(AuthGuard)
  @Post('message')
  async postMessage(@Body() body: InsertMessage) {
    await this.userService.updateLocalUser(body.userId)
    await this.messageService.addMessage(body)
    return body
  }
}
