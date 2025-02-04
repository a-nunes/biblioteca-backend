import { BookDTO } from 'App/Dto/BookDTO'
import { Book } from 'App/Models/Book'
import BooksRepository from 'App/Repositories/BooksRepository'
import test from 'japa'

test('BooksRepository', () => {
  let book: BookDTO
  let sut: BooksRepository
  let booksAfterDeletion: Book[]

  test.group('add', (group) => {
    let bookBeforeDeletion: Book

    group.before(() => {
      book = {
        title: 'Harry Potter 4',
        publisher: 'Rocco',
        image: 'https://i.imgur.com/UH3IPXw.jpg',
        authors: ['J. K. Rowling', '...'],
      }
      bookBeforeDeletion = {
        id: 1,
        titulo: 'Harry Potter 4',
        editora: 'Rocco',
        foto: 'https://i.imgur.com/UH3IPXw.jpg',
        autores: ['J. K. Rowling', '...'],
      }
    })

    group.beforeEach(() => {
      sut = new BooksRepository()
    })

    test('assert add returns correct book after insert', (assert) => {
      const result = sut.add(book)
      assert.deepEqual(result, bookBeforeDeletion)
    })
  })

  test.group('update', (group) => {
    let newBook: BookDTO
    let updatedBook: Book

    group.before(() => {
      newBook = {
        title: 'Harry Potter 5',
        publisher: 'Rocco 1',
        image: 'https://i.imgur.com/UH3IPXw.jpg',
        authors: ['J. K. Rowling', '...'],
      }
      updatedBook = {
        id: 1,
        titulo: 'Harry Potter 5',
        editora: 'Rocco 1',
        foto: 'https://i.imgur.com/UH3IPXw.jpg',
        autores: ['J. K. Rowling', '...'],
      }
    })

    test('assert update returns undefined if book is not found', (assert) => {
      const result = sut.update(2, book)
      assert.isUndefined(result)
    })

    test('assert update returns updated book if its found', (assert) => {
      const result = sut.update(1, newBook)
      assert.deepEqual(result, updatedBook)
    })
  })

  test.group('delete', (group) => {
    group.before(() => {
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

    test('assert delete returns undefined if book is not found', (assert) => {
      const result = sut.delete(1)
      assert.isUndefined(result)
    })

    test('assert delete remove book if its found', (assert) => {
      sut.add(book)
      sut.delete(1)
      const books = sut.list()

      assert.deepEqual(books, booksAfterDeletion)
    })
  })

  test.group('list', () => {
    test('assert it list all books properly', (assert) => {
      assert.deepEqual(sut.list(), booksAfterDeletion)
    })
  })
})
