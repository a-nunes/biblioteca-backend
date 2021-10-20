import { BookDTO } from 'App/Dto/BookDTO'
import { Book } from 'App/Models/Book'

let books: Book[] = []
let id = 0
export default class BooksRepository {
  public add({ authors, image, publisher, title }: BookDTO): Book[] {
    id += 1
    const book: Book = {
      id,
      titulo: title,
      editora: publisher,
      foto: image,
      autores: authors,
    }
    books.push(book)
    return books
  }

  public list() {
    return books
  }

  public update(id: number, { authors, image, publisher, title }: BookDTO): Book | undefined {
    const book = books.find((book) => book.id === id)
    if (!book) return undefined
    book.titulo = title
    book.editora = publisher
    book.foto = image
    book.autores = authors
    return book
  }

  public delete(id: number): void | undefined {
    const bookIndex = books.findIndex((book) => book.id === id)
    if (bookIndex < 0) return undefined
    books.splice(bookIndex, 1)
  }
}
