import bookFactory from '../Factories/Book'

import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('GET /obras', () => {
  test('ensure returns 200 on success', async () => {
    await supertest(BASE_URL).get('/obras').expect(200)
  })
})

test.group('POST /obras', () => {
  test('ensure returns 201 and book on success', async () => {
    const params = bookFactory.build()
    await supertest(BASE_URL).post('/obras').set(params).expect(201, { id: 1 })
  })
})
