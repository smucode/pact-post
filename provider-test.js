import path from 'path'

import { Verifier } from 'pact'

const providerBaseUrl = 'http://127.0.0.1:3080'

const opts = {
  providerBaseUrl,
  provider: 'provider',
  pactUrls: [path.resolve(process.cwd(), 'consumer-provider.json')],
  providerStatesSetupUrl: `${providerBaseUrl}/state`
}

Verifier.verifyProvider(opts).then(
  result => {
    console.info(result)
    process.exit(~result.indexOf('0 failures') ? 0 : 1)
  },
  result => {
    console.error(result)
    process.exit(1)
  }
)
