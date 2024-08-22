
import { Injectable, Get, Header, Param, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import fse from 'fs-extra'
import { resolve } from "node:path";
import { safeJSONParse } from "utils";

const multiavatar = require('@multiavatar/multiavatar')

const FILE_STORAGE_PATH = resolve(process.cwd(), '.cache/avatar.json')

@Injectable()
export class UserService implements OnModuleDestroy, OnModuleInit {
  avatarCache: Record<string, string> = {}

  generateAvatar(info: string) {
    return multiavatar(info)
  }

  async onModuleInit() {
    await fse.ensureFile(FILE_STORAGE_PATH)
    const storage = safeJSONParse(
      await fse.readFile(FILE_STORAGE_PATH, 'utf-8')
    )

    this.avatarCache = Object.assign({}, storage)
  }

  onModuleDestroy() {
    fse.writeFileSync(FILE_STORAGE_PATH, JSON.stringify(this.avatarCache))
  }

  @Get('user/avatar')
  @Header('content-type', 'text/plaintext')
  avatar(@Param('name') name: string): string {
    const avatarSvg = this.generateAvatar(name)
    this.avatarCache[name] = avatarSvg
    return avatarSvg
  }
}
