import { Global, Module } from '@nestjs/common'
import { MessageDBService } from './service/message.db.service'
import { UserDBService } from './service/user.db.service'

@Global()
@Module({
  providers: [MessageDBService, UserDBService],
  exports: [MessageDBService, UserDBService],
})
export class DatabaseModule {}
