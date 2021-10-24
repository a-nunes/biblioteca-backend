import BooksRepository from 'App/Repositories/BooksRepository'
import bookFactory from '../Factories/Book'

import test from 'japa'

test.group('add', (group) => {
  let booksRepository: BooksRepository

  group.before(() => {
    booksRepository = BooksRepository.getInstance()
  })

  group.afterEach(() => {
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
  let booksRepository: BooksRepository

  group.before(() => {
    booksRepository = BooksRepository.getInstance()
  })

  group.afterEach(() => {
    booksRepository.clear()
  })

  test('assert it list all books properly', (assert) => {
    const params1 = bookFactory.build({ title: 'Harry Potter 1' })
    const book1 = booksRepository.add(params1)
    const params2 = bookFactory.build({ title: 'Harry Potter 2' })
    const book2 = booksRepository.add(params2)
    const books = booksRepository.list()
    assert.deepEqual(books, [book1, book2])
  })
})

// test.group('delete', (group) => {
//   group.before(() => {
//     booksAfterDeletion = [
//       {
//         id: 2,
//         titulo: 'Harry Potter 4',
//         editora: 'Rocco',
//         foto: 'https://i.imgur.com/UH3IPXw.jpg',
//         autores: ['J. K. Rowling', '...'],
//       },
//     ]
//   })

//   test('assert delete returns undefined if book is not found', (assert) => {
//     const result = booksRepository.delete(1)
//     assert.isUndefined(result)
//   })

//   test('assert delete remove book if its found', (assert) => {
//     booksRepository.add(book)
//     booksRepository.delete(1)
//     const books = booksRepository.list()

//     assert.deepEqual(books, booksAfterDeletion)
//   })
// })

// test.group('list', () => {
//   test('assert it list all books properly', (assert) => {
//     assert.deepEqual(booksRepository.list(), booksAfterDeletion)
//   })
// })
