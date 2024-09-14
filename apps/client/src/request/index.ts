import axios from 'axios'
import type { AddMessage, Message } from '~/utils'
import { addMessageSchema } from '~/utils'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
})

const { get, post, delete: del, put } = request

export function getAllMessages() {
  return get<Message[]>('/api/messages')
}

export function postMessage(messages: AddMessage) {
  addMessageSchema.parse(messages)
  return post('/api/message', messages, {
    withCredentials: true,
  })
}

export { get, post, del, put }
