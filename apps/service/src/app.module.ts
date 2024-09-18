import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ChatModule } from 'chat/chat.module'
import { UserModule } from 'user/user.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ChatModule,
    UserModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
})
export class AppModule {}
