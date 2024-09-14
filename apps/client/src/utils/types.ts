import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  avatar: z.string(),
  nickName: z.string(),
})

export const messageSchema = z.object({
  id: z.number().optional(),
  user: userSchema,
  content: z.string(),
  createdAt: z.string().optional(),
})

export const messagesSchema = messageSchema.array()
export const addMessageSchema = z.object({
  userId: z.string(),
  content: z.string(),
})

export type User = z.infer<typeof userSchema>
export type Message = z.infer<typeof messageSchema>
export type AddMessage = z.infer<typeof addMessageSchema>
