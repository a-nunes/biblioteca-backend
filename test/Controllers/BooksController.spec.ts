import bookFactory from '../Factories/Book'
import BookParser from 'App/Parsers/BookParser'
import BooksRepository from 'App/Repositories/BooksRepository'

import test from 'japa'
import supertest from 'supertest'
import faker from 'faker'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const booksRepository = BooksRepository.getInstance()

test.group('GET /obras', () => {
  test('ensure returns 200 on success', async () => {
    await supertest(BASE_URL).get('/obras').expect(200)
  })
})

test.group('POST /obras', (group) => {
  group.afterEach(() => {
    booksRepository.clear()
  })

  test('ensure returns 201 and book on success', async () => {
    const params = {
      title: faker.lorem.words(2),
      publisher: faker.company.companyName(),
      image: faker.internet.url(),
      authors: [faker.name.findName()],
    }
    const parsedParams = new BookParser(params).parse()

    await supertest(BASE_URL)
      .post('/obras')
      .send(params)
      .expect(201, { ...parsedParams, id: 1 })
  })

  test('ensure returns 400 if validation fails', async (assert) => {
    const params = bookFactory.build()

    const { body } = await supertest(BASE_URL).post('/obras').send(params).expect(400)

    assert.include(body.errors[0], { message: 'required validation failed' })
  })
})

test.group('PUT /obras', (group) => {
  group.afterEach(() => {
    booksRepository.clear()
  })

  test('ensure returns 200 and book on success', async () => {
    const params = {
      title: faker.lorem.words(2),
      publisher: faker.company.companyName(),
      image: faker.internet.url(),
      authors: [faker.name.findName()],
    }
    const { body } = await supertest(BASE_URL).post('/obras').send(params)
    const updatedParams = { title: 'Harry Potter' }

    await supertest(BASE_URL)
      .put('/obras/1')
      .send(updatedParams)
      .expect(200, { ...body, titulo: 'Harry Potter' })
  })

  test('ensure returns 400 and error if book do not exists', async () => {
    await supertest(BASE_URL).put('/obras/1').expect(400, { error: 'book was not find' })
  })

  test.group('DELETE /obras', (group) => {
    group.afterEach(() => {
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
})
