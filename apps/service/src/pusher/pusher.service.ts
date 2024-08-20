import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher";

@Injectable()
export class PusherService {
  pusher: Pusher

  constructor() {
    this.pusher = new Pusher({
      appId: "1852571",
      key: "332ec1764f96bb71fe19",
      secret: "28250c3ca0e976177f58",
      cluster: "ap3",
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data)
  }
}
