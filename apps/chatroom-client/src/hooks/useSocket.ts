import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:3002';

const socket = io(URL);

interface Message {
  username: string;
  message: string;
}

export function useChat() {
  const [onlineCount, setOnlineCount] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const handleOnlineCount = (count: number) => {
      setOnlineCount(count)
    }
    const handleMessageComing = (message: Message) => {
      console.log('message', message)
      setMessages((prev) => [...prev, message])
    }

    socket.on('online-count', handleOnlineCount)
    socket.on('message', handleMessageComing)

    return () => {
      socket.off('online-count', handleOnlineCount)
      socket.off('message', handleMessageComing)
    };
  }, []);

  function send(message: Message) {
    socket.emit('message', message)
    setMessages([...messages, message])
  }

  return {
    send,
    onlineCount,
    messages
  }
}
