import { useState, type FormEvent } from "react"
import { useChat } from "~/hooks/useSocket";

function Chat() {
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  const { onlineCount, send, messages } = useChat()

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
      <div>{onlineCount}</div>
      <label htmlFor="username">User Name: </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <ul>
        {messages.map((message) => (
          <li key={JSON.stringify(message)}>{JSON.stringify(message)}</li>
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

export default Chat
