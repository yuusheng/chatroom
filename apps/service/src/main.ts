import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: [/http:\/\/localhost:*/, 'https://chatie.yuusheng.me'],
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(3000, '0.0.0.0')
}
bootstrap()
