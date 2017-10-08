import pact from 'pact'
import path from 'path'
import axios from 'axios'
import { pipe } from 'ramda'

const provider = pact({
  consumer: 'consumer',
  provider: 'provider',
  providerPort: 1234,
  log: path.resolve(process.cwd(), '.', 'pact.log'),
  dir: path.resolve(process.cwd(), '.'),
  logLevel: 'WARN',
  spec: 2,
  pactfileWriteMode: 'update'
})

describe('some consumer test', () => {
  before(() =>
    provider.setup().then(() =>
      provider.addInteraction({
        state: 'backend is in some state',
        uponReceiving: 'a post query with some json body',
        withRequest: {
          method: 'POST',
          path: '/api',
          body: { foo: 'bar' },
        },
        willRespondWith: {
          status: 200,
          body: { foo: 'bar' }
        }
      })
    )
  )

  it('tests stuff', () => {
    return axios
      .post('http://127.0.0.1:1234/api', {foo: 'bar'})
      .then(res => {
        if (res.data.foo !== 'bar') {
          throw new Error("foo is not bar")
        }
      })
  })

  //eslint-disable-next-line
  after(pipe(provider.verify, provider.finalize))
})
