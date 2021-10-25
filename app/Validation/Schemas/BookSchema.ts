import { schema } from '@ioc:Adonis/Core/Validator'

export const BookSchema = schema.create({
  title: schema.string(),
  publisher: schema.string(),
  image: schema.string(),
  authors: schema.array().members(schema.string()),
})
