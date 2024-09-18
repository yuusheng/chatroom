import { type FormEvent, useState } from 'react'
import { Input } from '~/components/ui/input'
import { useChat } from '~/hooks/useChat'
import { MessageBubble } from './Message'

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
      {
        isLoading
          ? (
              <div className="overflow-auto scrollbar-hidden">
                <div className="flex flex-col gap-4 mb-10">
                  {messages?.map(message => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </div>
            )
          : 'loading...'
      }
      <form onSubmit={submit} className="w-full fixed bottom-10 left-0 px-40">
        <Input placeholder="Input your message, `Enter` to send." value={message} onChange={e => setMessage(e.target.value)} />
      </form>
    </div>
  )
}

export default ChatRoom
