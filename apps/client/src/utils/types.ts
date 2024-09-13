import z from 'zod'

export const userSchema = z.object({
  id: z.string(),
  hasImage: z.boolean(),
  imageUrl: z.string().optional(),
  firstname: z.string(),
  primaryEmailAddress: z.object({
    emailAddress: z.string(),
  }),
}).transform(o => ({
  id: o.id,
  avatar: o.hasImage && o.imageUrl ? o.imageUrl : `http://`,
  nickName: o.firstname,
  email: o.primaryEmailAddress.emailAddress,
}))

export const messageSchema = z.object({
  user: userSchema,
  createAt: z.string(),
  content: z.string(),
})

export type User = z.infer<typeof userSchema>
export type Message = z.infer<typeof messageSchema>
