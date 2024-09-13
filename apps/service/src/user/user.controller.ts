import { Controller, Get, Header, Query } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  avatarCache: Record<string, string> = {}

  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('avatar')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'public')
  avatar(@Query('name') name: string) {
    return this.userService.avatar(name)
  }
}
