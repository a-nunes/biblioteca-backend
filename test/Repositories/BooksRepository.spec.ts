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

  test('assert books length is increment by 1', (assert) => {})

  test('assert return is the correct book', (assert) => {})
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
