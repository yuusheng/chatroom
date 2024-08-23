import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import type { Message } from "~/hooks/useChat"

export function Message({ message }: { message: Message }) {
  return (
    <div className="flex">
      <Avatar>
        <AvatarImage src={message.avatar} style={{ backgroundImage: message.avatar }} />
        <AvatarFallback>{message.message.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="w-32">{message.message}</div>
    </div>
  )
}
