import bookParsedFactory from '../Factories/BookParsed'
import bookRawFactory from '../Factories/BookRaw'
import { BASE_URL } from '../Setup'
import BookParser from 'App/Parsers/BookParser'
import BooksRepository from 'App/Repositories/BooksRepository'
import { Book } from 'App/Models/Book'

import test from 'japa'
import supertest from 'supertest'
import faker from 'faker'

const booksRepository = BooksRepository.getInstance()

test.group('GET /obras', () => {
  test('ensure returns 200 on success', async () => {
    const compareBooks: Book[] = []
    const booksList = bookParsedFactory.buildList(10)
    booksList.forEach((book) => {
      const doubleBook = booksRepository.add(book)
      compareBooks.push(doubleBook)
    })

    await supertest(BASE_URL).get('/obras').expect(200, compareBooks)
  })
})

test.group('POST /obras', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('ensure returns 201 and book on success', async () => {
    const params = {
      title: faker.lorem.words(2),
      publisher: faker.company.companyName(),
      image: faker.internet.url(),
      authors: [faker.name.findName()],
    }
    const parsedParams = new BookParser().parse(params)

    await supertest(BASE_URL)
      .post('/obras')
      .send(params)
      .expect(201, { ...parsedParams, id: 1 })
  })

  test('ensure returns 400 if validation fails', async (assert) => {
    const params = bookRawFactory.build({ title: undefined })

    const { body } = await supertest(BASE_URL).post('/obras').send(params).expect(400)

    assert.include(body.errors[0], { message: 'required validation failed' })
  })
})

test.group('PUT /obras', (group) => {
  group.beforeEach(() => {
    booksRepository.clear()
  })

  test('ensure returns 200 and book on success', async () => {
    const params = bookRawFactory.build()
    const parsedParams = new BookParser().parse(params)
    const book = booksRepository.add(parsedParams)

    const updatedParams = { ...params, title: 'Harry Potter' }

    await supertest(BASE_URL)
      .put('/obras/1')
      .send(updatedParams)
      .expect(200, { ...book, titulo: 'Harry Potter' })
  })

  test('ensure returns 400 if validation fails', async (assert) => {
    const params = bookRawFactory.build()
    const parsedParams = new BookParser().parse(params)
    booksRepository.add(parsedParams)
    const updatedParams = { ...params, title: undefined }

    const { body } = await supertest(BASE_URL).put('/obras/1').send(updatedParams).expect(400)

    assert.include(body.errors[0], { message: 'required validation failed' })
  })

  test('ensure returns 400 and error if book do not exists', async () => {
    const params = bookRawFactory.build()

    await supertest(BASE_URL)
      .put('/obras/1')
      .send(params)
      .expect(400, { error: 'book was not found' })
  })

  test.group('DELETE /obras', (group) => {
    group.beforeEach(() => {
      booksRepository.clear()
    })

    test('ensure returns 204 on success', async () => {
      const params = {
        title: faker.lorem.words(2),
        publisher: faker.company.companyName(),
        image: faker.internet.url(),
        authors: [faker.name.findName()],
      }
      await supertest(BASE_URL).post('/obras').send(params)

      await supertest(BASE_URL).delete('/obras/1').expect(204)
    })
  })

  test('ensure returns 400 and error if book do not exists', async () => {
    await supertest(BASE_URL).delete('/obras/1').expect(400, { error: 'book was not found' })
  })
})
