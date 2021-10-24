import { BookDTO } from 'App/Dto/BookDTO'
import { BooksRepository } from 'App/Repositories/BooksRepository'

export default class BookParser {
  constructor(private readonly params: BookDTO) {}

  public parse(): BooksRepository.Params {
    return {
      titulo: this.params.title,
      editora: this.params.publisher,
      foto: this.params.image,
      autores: this.params.authors,
    }
  }
}
