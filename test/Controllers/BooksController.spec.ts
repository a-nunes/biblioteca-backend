import bookFactory from '../Factories/Book'

import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('index', () => {
  test('ensure returns 200 on success', async () => {
    await supertest(BASE_URL).get('/obras').expect(200)
  })
})
