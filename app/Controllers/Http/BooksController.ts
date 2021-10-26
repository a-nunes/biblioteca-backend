import BookParser from 'App/Parsers/BookParser'
import BooksRepository, { BooksRepository as Book } from 'App/Repositories/BooksRepository'
import { BookSchema } from 'App/Validation/Schemas/BookSchema'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RequestContract as Request } from '@ioc:Adonis/Core/Request'
import { ResponseContract as Response } from '@ioc:Adonis/Core/Response'

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
    const params = await this.permitedParams(request, response)
    if (params) {
      const book = this.booksRepository.add(params)
      response.status(201).json(book)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const id = parseInt(request.param('id'))
      const params = await this.permitedParams(request, response)
      if (params) {
        const updatedBook = this.booksRepository.update(id, params)
        response.status(200).json(updatedBook)
      }
    } catch (error) {
      response.badRequest({ error: error.message })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const id = parseInt(request.param('id'))
      this.booksRepository.delete(id)
      response.status(204)
    } catch (error) {
      response.badRequest({ error: error.message })
    }
  }

  private async permitedParams(req: Request, res: Response): Promise<Book.Params | void> {
    try {
      const params = await req.validate({ schema: BookSchema })
      return new BookParser().parse(params)
    } catch (error) {
      res.badRequest(error.messages)
    }
  }
}
