import { Book } from 'App/Models/Book'

export namespace BooksRepository {
  export type Params = {
    titulo: string
    editora: string
    foto: string
    autores: string[]
  }
}
export default class BooksRepository {
  private static instance: BooksRepository
  private books: Book[] = []
  private id = 0
  private ATTRIBUTES = ['titulo', 'editora', 'foto', 'autores']

  private permittedParams(params: BooksRepository.Params) {
    const validEntries = Object.entries(params).filter(
      ([key, value]) => this.ATTRIBUTES.includes(key) && !!value
    )
    return Object.fromEntries(validEntries)
  }

  private constructor() {}

  public static getInstance(): BooksRepository {
    if (!BooksRepository.instance) {
      BooksRepository.instance = new BooksRepository()
    }
    return BooksRepository.instance
  }

  public clear(): void {
    this.id = 0
    this.books = []
  }

  public add(params: BooksRepository.Params): Book {
    this.id++
    const book: Book = { id: this.id, ...(this.permittedParams(params) as BooksRepository.Params) }
    this.books.push(book)
    return book
  }

  public list() {
    return this.books
  }

  public update(id: number, params: BooksRepository.Params): Book {
    let book = this.books.find((book) => book.id === id)
    if (!book) {
      throw new Error('book was not found')
    }
    book = { ...book, ...(this.permittedParams(params) as BooksRepository.Params) }
    return book
  }

  public delete(id: number): void {
    const bookIndex = this.books.findIndex((book) => book.id === id)
    if (bookIndex < 0) {
      throw new Error('book was not found')
    }
    this.books.splice(bookIndex, 1)
  }
}
