import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BookDTO } from 'App/Dto/BookDTO'
import BooksRepository from 'App/Repositories/BooksRepository'

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
    const book = request.body() as BookDTO
    const books = this.booksRepository.add(book)
    response.status(201).json(books)
  }

  public async update({ request, response }: HttpContextContract) {
    const book = request.body() as BookDTO
    const id = parseInt(request.param('id'))
    const updatedBook = this.booksRepository.update(id, book)
    response.status(200).json(updatedBook)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = parseInt(request.param('id'))
    const books = this.booksRepository.delete(id)
    response.status(200).json(books)
  }
}
