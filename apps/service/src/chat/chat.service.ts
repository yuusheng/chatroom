import { Injectable } from '@nestjs/common'
import { MessageDBService } from 'database/service/message.db.service'

@Injectable()
export class ChatService {
  constructor(
    private readonly messageDBService: MessageDBService,
  ) { }

  async newMessage(userId: string, content: string) {
    await this.messageDBService.addMessage({ userId, content })
  }
}
