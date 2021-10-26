import { BookDTO } from 'App/Dto/BookDTO'

import { Factory } from 'fishery'
import faker from 'faker'

export default Factory.define<BookDTO>(() => ({
  title: faker.lorem.words(2),
  publisher: faker.company.companyName(),
  image: faker.internet.url(),
  authors: [faker.name.findName(), faker.name.findName()],
}))
