import { useState, type FormEvent } from "react"
import { useChat } from "~/hooks/useChat";
import { Message } from "./Message";
import { Input } from "~/components/ui/input";

function ChatRoom() {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  const { send, messages } = useChat()

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    send({
      message,
      username,
    })
    setMessage("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-auto scrollbar-hidden">
        <div className="flex flex-col gap-4 mb-10">
          {messages.map((message) => (
            <Message key={JSON.stringify(message)} message={message} />
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="w-full fixed bottom-0 left-0 px-40">
        <Input placeholder="Input your message, `Enter` to send." value={message} onChange={(e) => setMessage(e.target.value)} />
      </form>
    </div>
  )
}

export default ChatRoom
