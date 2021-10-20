import BooksRepository from 'App/Repositories/BooksRepository'
import test from 'japa'

test.group('BooksRepository', () => {
  test.group('delete', () => {
    test('assert delete returns undefined if book is not found', (assert) => {
      const sut = new BooksRepository()
      const result = sut.delete(1)
      assert.isUndefined(result)
    })
  })
})
