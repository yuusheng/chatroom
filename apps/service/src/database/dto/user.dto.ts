import { z } from "zod"

const userDto = z.object({
  nickName: z.string(),
  email: z.string()
})

export type UserDto = z.infer<typeof userDto>
