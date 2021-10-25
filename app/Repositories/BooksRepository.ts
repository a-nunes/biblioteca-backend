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

  public add({ autores, editora, foto, titulo }: BooksRepository.Params): Book {
    this.id++
    const book: Book = {
      id: this.id,
      titulo,
      editora,
      foto,
      autores,
    }
    this.books.push(book)
    return book
  }

  public list() {
    return this.books
  }

  public update(
    id: number,
    { autores, editora, foto, titulo }: BooksRepository.Params
  ): Book | undefined {
    const book = this.books.find((book) => book.id === id)
    if (!book) {
      return undefined
    }
    book.titulo = titulo ?? book.titulo
    book.editora = editora ?? book.editora
    book.foto = foto ?? book.foto
    book.autores = autores ?? book.autores
    return book
  }

  public delete(id: number): boolean | undefined {
    const bookIndex = this.books.findIndex((book) => book.id === id)
    if (bookIndex < 0) {
      return undefined
    }
    this.books.splice(bookIndex, 1)
    return true
  }
}
