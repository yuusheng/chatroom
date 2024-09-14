import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  hasImage: z.boolean(),
  imageUrl: z.string().optional(),
  firstName: z.string(),
  primaryEmailAddress: z.object({
    emailAddress: z.string(),
  }).optional(),
}).transform(o => ({
  id: o.id,
  avatar: o.hasImage && o.imageUrl ? o.imageUrl : `http://`,
  nickName: o.firstName,
}))

export const messageSchema = z.object({
  id: z.number().optional(),
  user: userSchema,
  content: z.string(),
})

export const messagesSchema = messageSchema.array()
export const addMessageSchema = z.object({
  userId: z.string(),
  content: z.string(),
})

export type User = z.infer<typeof userSchema>
export type Message = z.infer<typeof messageSchema>
export type AddMessage = z.infer<typeof addMessageSchema>
