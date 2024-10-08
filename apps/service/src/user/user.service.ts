import { resolve } from 'node:path'
import process from 'node:process'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { Injectable, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { UserDBService } from 'database/service/user.db.service'
import fse from 'fs-extra'
import { safeJSONParse } from 'utils'

// eslint-disable-next-line ts/no-require-imports
const multiavatar = require('@multiavatar/multiavatar')

const FILE_STORAGE_PATH = resolve(process.cwd(), '.cache/avatar.json')

@Injectable()
export class UserService implements OnModuleDestroy, OnModuleInit {
  avatarCache: Record<string, string> = {}

  constructor(
    private userDbService: UserDBService,
  ) { }

  generateAvatar(info: string) {
    return multiavatar(info)
  }

  async onModuleInit() {
    await fse.ensureFile(FILE_STORAGE_PATH)
    const storage = safeJSONParse(
      await fse.readFile(FILE_STORAGE_PATH, 'utf-8'),
    )

    this.avatarCache = Object.assign({}, storage)
  }

  onModuleDestroy() {
    fse.writeFileSync(FILE_STORAGE_PATH, JSON.stringify(this.avatarCache))
  }

  avatar(name: string) {
    const avatarSvg = this.generateAvatar(name)
    this.avatarCache[name] = avatarSvg
    return avatarSvg
  }

  getUser(userId: string) {
    return clerkClient.users.getUser(userId)
  }

  async updateLocalUser(userId: string) {
    const dbUser = await this.userDbService.findUser(userId)
    if (!dbUser) {
      const user = await clerkClient.users.getUser(userId)
      await this.userDbService.createUser({
        id: user.id,
        nickName: user.firstName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        avatar: user.imageUrl,
      })
    }
  }
}
