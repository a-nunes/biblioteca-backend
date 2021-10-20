import BooksRepository from 'App/Repositories/BooksRepository'
import test from 'japa'

test.group('BooksRepository', () => {
  test.group('delete', () => {
    test('assert delete returns undefined if book is not found', (assert) => {
      const sut = new BooksRepository()
      const result = sut.delete(1)
      assert.isUndefined(result)
    })

    test('assert delete remove book if its found', (assert) => {
      const sut = new BooksRepository()
      const book = {
        title: 'Harry Potter 4',
        publisher: 'Rocco',
        image: 'https://i.imgur.com/UH3IPXw.jpg',
        authors: ['J. K. Rowling', '...'],
      }
      sut.add(book)
      sut.add(book)
      sut.delete(1)
      const books = sut.list()

      assert.deepEqual(books, [
        {
          id: 2,
          titulo: 'Harry Potter 4',
          editora: 'Rocco',
          foto: 'https://i.imgur.com/UH3IPXw.jpg',
          autores: ['J. K. Rowling', '...'],
        },
      ])
    })
  })
})
