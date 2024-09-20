import dayjs from 'dayjs'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import type { Message } from '~/utils'
import { Skeleton } from '~/components/ui/skeleton'

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

export function MessageSketlonList() {
  return (
    <div className="flex flex-col gap-5">
      {
        Array
          .from({ length: 10 }, (_v, k) => k)
          .map(value => (<MessageSketlon key={value} />))
      }
    </div>
  )
}

export function MessageSketlon() {
  return (
    <div className="flex gap-3">
      <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
      <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Skeleton className="h-5 w-10 rounded" />
          <Skeleton className="h-5 w-32 rounded" />
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          <Skeleton className="h-5 w-14 rounded py-2.5" />
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <Skeleton className="h-5 w-15 rounded py-2.5" />
        </span>
      </div>
    </div>
  )
}
