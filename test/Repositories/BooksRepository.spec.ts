import { Book } from 'App/Models/Book'
import BooksRepository from 'App/Repositories/BooksRepository'
import bookFactory from '../Factories/Book'

import test from 'japa'

const booksRepository = BooksRepository.getInstance()

test.group('add', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('assert last book in books correct', (assert) => {
    const params = bookFactory.build()
    const book = booksRepository.add(params)

    const books = booksRepository.list()

    assert.deepEqual(books[books.length - 1], book)
  })

  test('assert books length is increment by 1', (assert) => {
    const params = bookFactory.build()
    booksRepository.add(params)

    const books = booksRepository.list()

    assert.deepEqual(books.length, 1)
  })
})

test.group('list', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('assert it list all books properly', (assert) => {
    const compareBooks: Book[] = []

    for (let i = 0; i < 10; i++) {
      const book = bookFactory.build()
      const doubleBook = booksRepository.add(book)
      compareBooks.push(doubleBook)
    }

    const books = booksRepository.list()

    assert.deepEqual(books, compareBooks)
  })
})

test.group('delete', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('assert delete throws if book is not found', (assert) => {
    const params = bookFactory.build()
    const book = booksRepository.add(params)

    const result = () => booksRepository.delete(2)
    const books = booksRepository.list()

    assert.throws(result, 'book was not found')
    assert.include(books, book)
    assert.deepEqual(books.length, 1)
  })

  test('assert delete remove book if its found', (assert) => {
    const params = bookFactory.build()
    const book = booksRepository.add(params)

    booksRepository.delete(1)
    const books = booksRepository.list()

    assert.notInclude(books, book)
    assert.isEmpty(books)
  })
})

test.group('update', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('assert update throws if book is not found', (assert) => {
    const params = bookFactory.build()
    const book = booksRepository.add(params)
    const updatedParams = bookFactory.build({ titulo: 'Harry Potter', editora: 'Rocco' })

    const updatedBook = () => booksRepository.update(2, updatedParams)
    const books = booksRepository.list()

    assert.throws(updatedBook, 'book was not found')
    assert.include(books, book)
    assert.deepEqual(books.length, 1)
  })

  test('assert update returns updated book if its found', (assert) => {
    const params = bookFactory.build()
    booksRepository.add(params)
    const updatedParams = bookFactory.build({ titulo: 'Harry Potter', editora: 'Rocco' })

    const updatedBook = booksRepository.update(1, updatedParams)

    assert.deepInclude(updatedBook, { titulo: 'Harry Potter', editora: 'Rocco' })
  })
})
