import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatController } from "./chat.controller";
import { UserModule } from "user/user.module";
import { ChatService } from "./chat.service";

@Module({
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
  controllers: [ChatController],
  imports: [UserModule]
})
export class ChatModule {}
