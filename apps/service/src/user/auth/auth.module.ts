import { Module } from '@nestjs/common'
import { AuthGuard } from './auth.guard'

@Module({
  exports: [AuthGuard],
})
export class AuthModule { }
