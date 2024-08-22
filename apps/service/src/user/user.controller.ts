import { Controller, Get, Header, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('api')
export class UserController {
  avatarCache: Record<string, string> = {}

  constructor(
    private readonly userService: UserService
  ) {}

  @Get('user/avatar')
  @Header('content-type', 'text/plaintext')
  avatar(@Param('name') name: string) {
    return this.userService.avatar(name)
  }
}
