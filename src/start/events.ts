import database from '@adonisjs/lucid/services/db'
import emitter from '@adonisjs/core/services/emitter'
import logger from '@adonisjs/core/services/logger'
import app from '@adonisjs/core/services/app'
import env from '#start/env'
// Events
import UserRegistered from '#events/user_registered'

const SendVerificationEmail = () => import('#listeners/send_verification_email')

// Query Logger
if (env.get('QUERY_DEBUG') === 'true') {
  emitter.on('db:query', (query) => {
    if (app.inProduction) {
      logger.debug(query)
    } else {
      database.prettyPrint(query)
    }
  })
}

// Emitters

emitter.on(UserRegistered, [SendVerificationEmail])