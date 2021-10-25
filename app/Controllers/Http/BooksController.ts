import { BookDTO } from 'App/Dto/BookDTO'
import BookParser from 'App/Parsers/BookParser'
import BooksRepository from 'App/Repositories/BooksRepository'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class BooksController {
  private readonly booksRepository: BooksRepository

  constructor() {
    this.booksRepository = BooksRepository.getInstance()
  }

  public async index({ response }: HttpContextContract) {
    const books = this.booksRepository.list()
    response.status(200).json(books)
  }

  public async store({ request, response }: HttpContextContract) {
    const newBookSchema = schema.create({
      title: schema.string(),
      publisher: schema.string(),
      image: schema.string(),
      authors: schema.array().members(schema.string()),
    })
    try {
      const params = await request.validate({ schema: newBookSchema })
      const parsedParams = new BookParser(params).parse()
      const book = this.booksRepository.add(parsedParams)
      response.status(201).json(book)
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const params = request.body() as BookDTO
    const parsedParams = new BookParser(params).parse()
    const id = parseInt(request.param('id'))
    const updatedBook = this.booksRepository.update(id, parsedParams)
    response.status(200).json(updatedBook)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = parseInt(request.param('id'))
    this.booksRepository.delete(id)
    response.status(204)
  }
}
