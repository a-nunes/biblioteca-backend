import { BooksRepository } from 'App/Repositories/BooksRepository'
import { Factory } from 'fishery'
import faker from 'faker'

export default Factory.define<BooksRepository.Params>(() => ({
  titulo: faker.lorem.words(2),
  editora: faker.company.companyName(),
  foto: faker.internet.url(),
  autores: [faker.name.findName(), faker.name.findName()],
}))
