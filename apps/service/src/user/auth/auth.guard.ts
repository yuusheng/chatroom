import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { clerkClient } from '@clerk/clerk-sdk-node'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const session = request.cookies.__session
      await clerkClient.verifyToken(session)
      return true
    }
    catch {
      return false
    }
  }
}
