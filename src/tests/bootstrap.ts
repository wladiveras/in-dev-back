import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import logger from '@adonisjs/core/services/logger'
import env from '#start/env'
import { authApiClient } from '@adonisjs/auth/plugins/api_client'

export const plugins: Config['plugins'] = [
  assert(),
  apiClient({
    baseURL: `${env.get('PROTOCOL')}://${env.get('HOST')}:${env.get('PORT')}`
  }),
  authApiClient(app),
  pluginAdonisJS(app)
]

export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    () => {
      logger.info('Starting all tests')
    }
  ],
  teardown: [
    () => {
      logger.info('All tests are finished')
    }
  ],
}

export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
