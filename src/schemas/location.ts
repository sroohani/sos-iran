import { z } from 'zod'

export const locationSchema = z.object({
  alpha2: z.string().default('').optional(),
  name: z.string().default('').optional(),
})

export type LocationSchema = z.infer<typeof locationSchema>
