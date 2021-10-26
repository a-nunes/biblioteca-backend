import { BookDTO } from 'App/Dto/BookDTO'
import { BooksRepository } from 'App/Repositories/BooksRepository'

export default class BookParser {
  public parse({ title, authors, image, publisher }: BookDTO): BooksRepository.Params {
    return {
      titulo: title,
      editora: publisher,
      foto: image,
      autores: authors,
    }
  }
}
