import axios from 'axios'
import { Message } from './dto'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
})

const { get, post, delete: del, put } = request

export function getAllMessages() {
  return get('/api/messages')
}

export function postMessage(messages: Message) {
  return post('/api/messages', messages)
}

export { get, post, del, put }
