import { type FormEvent, useState } from 'react'
import { MessageBubble, MessageSketlonList } from './Message'
import { Input } from '~/components/ui/input'
import { useChat } from '~/hooks/useChat'

function ChatRoom() {
  const [message, setMessage] = useState('')

  const { send, messages, isLoading } = useChat()

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    send(message)
    setMessage('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto scrollbar-hidden">
        <div className="flex flex-col gap-4 mb-10">
          {isLoading
            ? messages?.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))
            : <MessageSketlonList />}
        </div>
      </div>
      <form onSubmit={submit} className="w-full fixed bottom-10 left-0 px-40">
        <Input placeholder="Input your message, `Enter` to send." value={message} onChange={e => setMessage(e.target.value)} />
      </form>
    </div>
  )
}

export default ChatRoom
