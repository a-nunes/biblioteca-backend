import bookFactory from '../Factories/Book'

import test from 'japa'
import supertest from 'supertest'
import faker from 'faker'
import BookParser from 'App/Parsers/BookParser'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('GET /obras', () => {
  test('ensure returns 200 on success', async () => {
    await supertest(BASE_URL).get('/obras').expect(200)
  })
})

test.group('POST /obras', () => {
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
})
