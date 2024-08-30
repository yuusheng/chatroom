import { SubscribeMessage, WebSocketGateway, WebSocketServer, type OnGatewayConnection, type OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, type Server } from 'socket.io'
import { ChatService } from './chat.service';

@WebSocketGateway(3002, { cors: { origin: '*' }})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server!: Server
  count = 0

  constructor(
    private readonly chatService: ChatService
  ) {}

  handleConnection(client: Socket) {
    console.log('New user connected', client.id)

    this.count++
    client.broadcast.emit('user-joined', {
      message: `New user joined the chat: ${client.id}`,
      count: this.count
    })

    this.server.emit('online-count', this.count)
  }

  handleDisconnect(client: Socket) {
    console.log('User leave chat', client.id)

    this.count--
    client.broadcast.emit('user-leave', {
      message: `User leave the chat: ${client.id}`,
      count: this.count
    })
    this.server.emit('online-count', this.count)
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket) {
    client.emit('pong')
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, message: any) {
    client.broadcast.emit('message', {
      ...message,
      avatar: 'http://localhost:3000/api/user/avatar?name=' + (message.username || client.id)
    })

    await this.chatService.newMessage(1, message)
  }
}
