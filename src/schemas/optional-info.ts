import { z } from 'zod'
import { locationSchema } from './location'

export const optionalInfoSchema = z.object({
  fullName: z.string().optional(),
  countryOfResidence: locationSchema.optional(),
})

export type OptionalInfoSchema = z.infer<typeof optionalInfoSchema>
