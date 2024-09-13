import { useUser } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { toast } from 'sonner'
import { onlineCountAtom, showUserJoinedAtom } from '~/atoms'
import { getAllMessages } from '~/request'

const URL = import.meta.env.VITE_API_WS_HOST

const socket = io(URL)

export interface Message {
  username: string
  message: string
  avatar?: string
}

export function useChat() {
  const setOnlineCount = useSetAtom(onlineCountAtom)
  const { data, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: getAllMessages,
  })
  const [messages, setMessages] = useState<Message[]>([])
  const showUserJoin = useAtomValue(showUserJoinedAtom)
  useEffect(() => {
    console.log(data)
    // setMessages(data?.data as any || [])
  }, [data])

  useEffect(() => {
    const handleOnlineCount = (count: number) => {
      setOnlineCount(count)
    }
    const handleMessageComing = (message: Message) => {
      setMessages(prev => [...prev, message])
    }
    const handleNewGuest = (guest: any) => {
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
    }
  }, [showUserJoin])

  const { user } = useUser()
  function send(message: string) {
    if (!user) {
      toast.error('Please Login first')
      return
    }
    console.log(user, message)
  }

  return {
    send,
    messages,
    isLoading,
  }
}
