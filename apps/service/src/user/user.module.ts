import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, AuthModule],
})
export class UserModule { }
