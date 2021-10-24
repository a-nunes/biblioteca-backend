import { BookDTO } from 'App/Dto/BookDTO'
import { Book } from 'App/Models/Book'

export default class BooksRepository {
  private static instance: BooksRepository
  private books: Book[] = []
  private id = 0

  private constructor() {}

  public static getInstance(): BooksRepository {
    if (!BooksRepository.instance) {
      BooksRepository.instance = new BooksRepository()
    }
    return BooksRepository.instance
  }

  public clear(): Book[] {
    return (this.books = [])
  }

  public add({ authors, image, publisher, title }: BookDTO): Book {
    this.id++
    const book: Book = {
      id: this.id,
      titulo: title,
      editora: publisher,
      foto: image,
      autores: authors,
    }
    this.books.push(book)
    return book
  }

  public list() {
    return this.books
  }

  public update(id: number, { authors, image, publisher, title }: BookDTO): Book | undefined {
    const book = this.books.find((book) => book.id === id)
    if (!book) {
      return undefined
    }
    book.titulo = title
    book.editora = publisher
    book.foto = image
    book.autores = authors
    return book
  }

  public delete(id: number): void | undefined {
    const bookIndex = this.books.findIndex((book) => book.id === id)
    if (bookIndex < 0) return undefined
    this.books.splice(bookIndex, 1)
  }
}
