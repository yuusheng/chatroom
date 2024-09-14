import dayjs from 'dayjs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Message } from '~/utils'

export function MessageBubble({ message }: { message: Message }) {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage
          src={message.user.avatar}
          style={{ backgroundImage: message.user.avatar }}
        />
        <AvatarFallback>{message.content.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {message.user.nickName}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {dayjs(message.createdAt).format('YYYY-MM-DD')}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message.content}
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
    </div>
  )
}
