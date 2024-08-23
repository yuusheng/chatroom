import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { onlineCountAtom, showUserJoinedAtom } from '~/atoms'
import { toast } from "sonner"

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:3002';

const socket = io(URL);

export interface Message {
  username: string;
  message: string;
  avatar?: string;
}

export function useChat() {
  const setOnlineCount = useSetAtom(onlineCountAtom)
  const [messages, setMessages] = useState<Message[]>([])
  const showUserJoin = useAtomValue(showUserJoinedAtom)

  useEffect(() => {
    const handleOnlineCount = (count: number) => {
      setOnlineCount(count)
    }
    const handleMessageComing = (message: Message) => {
      setMessages((prev) => [...prev, message])
    }
    const handleNewGuest = (guest: { }) => {
      if (showUserJoin) {
        toast('New guest coming', guest)
      }
    }

    socket.on('online-count', handleOnlineCount)
    socket.on('message', handleMessageComing)
    socket.on('user-joined', handleNewGuest)

    return () => {
      socket.off('online-count', handleOnlineCount)
      socket.off('message', handleMessageComing)
      socket.off('user-joined', handleNewGuest)
    };
  }, [showUserJoin]);

  function send(message: Message) {
    socket.emit('message', message)
    setMessages([...messages, { ...message, avatar: `http://localhost:3000/api/user/avatar?name=${'user'}` }])
  }

  return {
    send,
    messages
  }
}
