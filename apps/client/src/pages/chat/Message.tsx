import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import type { Message } from '~/hooks/useChat'

export function MessageBubble({ message }: { message: Message }) {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={message.avatar}
          style={{ backgroundImage: message.avatar }}
        />
        <AvatarFallback>{message.message.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message.message}
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
    </div>
  )
}
