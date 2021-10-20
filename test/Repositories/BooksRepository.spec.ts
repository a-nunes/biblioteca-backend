import { BookDTO } from 'App/Dto/BookDTO'
import { Book } from 'App/Models/Book'
import BooksRepository from 'App/Repositories/BooksRepository'
import test from 'japa'

test('BooksRepository', () => {
  test.group('delete', (group) => {
    let booksAfterDeletion: Book[]
    let book: BookDTO
    let sut: BooksRepository

    group.before(() => {
      book = {
        title: 'Harry Potter 4',
        publisher: 'Rocco',
        image: 'https://i.imgur.com/UH3IPXw.jpg',
        authors: ['J. K. Rowling', '...'],
      }
      booksAfterDeletion = [
        {
          id: 2,
          titulo: 'Harry Potter 4',
          editora: 'Rocco',
          foto: 'https://i.imgur.com/UH3IPXw.jpg',
          autores: ['J. K. Rowling', '...'],
        },
      ]
    })

    group.beforeEach(() => {
      sut = new BooksRepository()
    })

    test('assert delete returns undefined if book is not found', (assert) => {
      const result = sut.delete(1)
      assert.isUndefined(result)
    })

    test('assert delete remove book if its found', (assert) => {
      sut.add(book)
      sut.add(book)
      sut.delete(1)
      const books = sut.list()

      assert.deepEqual(books, booksAfterDeletion)
    })
  })
})
