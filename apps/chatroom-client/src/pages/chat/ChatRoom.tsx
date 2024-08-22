import { useState, type FormEvent } from "react"
import { useChat } from "~/hooks/useSocket";
import { Message } from "./Message";

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
    <>
      <label htmlFor="username">User Name: </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <ul>
        {messages.map((message) => (
          <Message key={JSON.stringify(message)} message={message} />
        ))}
      </ul>

      <form onSubmit={submit}>
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </>
  )
}

export default ChatRoom
