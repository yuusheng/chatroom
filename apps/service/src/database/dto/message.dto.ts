import { z } from 'zod'

const messageDto = z.object({
  userId: z.number(),
  content: z.string()
})

export type MessageDto = z.infer<typeof messageDto>
