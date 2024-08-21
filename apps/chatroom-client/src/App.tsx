import { useEffect, useRef, useState, type FormEvent } from "react"
import "./App.css"
import pusherJs from "pusher-js"

interface Message {
  username: string;
  message: string;
  id: number
}
function App() {
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const count = useRef(0)

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    await fetch("http://localhost:3000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        username,
        id: count.current++
      }),
    })

    setMessage("")
  }

  useEffect(() => {
    pusherJs.logToConsole = true

    const pusher = new pusherJs("332ec1764f96bb71fe19", {
      cluster: "ap3",
    })

    const channel = pusher.subscribe("chat")
    channel.bind("message", (data: Message) => {
      setMessages((prev) => ([...prev, data]))
    })

    return () => {
      pusher.unsubscribe('chat')
      channel.unbind_all()
    }
  }, [])

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
          <li key={message.id}>{JSON.stringify(message)}</li>
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

export default App
