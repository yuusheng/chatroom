import { Controller, Get, Header, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDBService } from "database/service/user.db.service";

@Controller('api/user')
export class UserController {
  avatarCache: Record<string, string> = {}

  constructor(
    private readonly userService: UserService,
    private readonly userDBService: UserDBService
  ) {}

  @Get('avatar')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'public')
  avatar(@Query('name') name: string) {
    return this.userService.avatar(name)
  }

  @Post()
  async createUser(@Query('nickName') nickName: string, @Query('email') email: string) {
    await this.userDBService.createUser({ nickName, email })
  }

  @Get()
  findAll() {
    return this.userDBService.findAllUser()
  }
}
