import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, type OnGatewayConnection, type OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, type Server } from 'socket.io'


@WebSocketGateway(3002, { cors: {origin: '*' }})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private server: Server
  count = 0

  handleConnection(client: Socket) {
    console.log('New user connected', client.id)

    this.count++
    client.broadcast.emit('user-joined', {
      message: `New user joined the chat: ${client.id}`,
      count: this.count
    })
  }

  handleDisconnect(client: Socket) {
    console.log('User leave chat', client.id)

    this.count--
    client.broadcast.emit('user-leave', {
      message: `User leave the chat: ${client.id}`,
      count: this.count
    })
  }

  @SubscribeMessage('ping')
  handleMessage(client: Socket, message: any) {
    client.emit('pong')
  }
}
