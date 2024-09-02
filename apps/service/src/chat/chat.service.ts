import type { MessageDBService } from 'database/service/message.db.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatService {
  constructor(
    private readonly messageDBService: MessageDBService,
  ) {}

  async newMessage(userId: number, content: string) {
    await this.messageDBService.addMessage({ userId, content })
  }
}
