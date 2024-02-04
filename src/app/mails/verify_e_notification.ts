import User from '#models/user'
import logger from '@adonisjs/core/services/logger'
import { BaseMail } from '@adonisjs/mail'

export default class VerifyENotification extends BaseMail {
  constructor(public user: User) {
    super()
  }

  from = 'hi@wladi.com.br'
  subject = 'Hello: Verify your email'

  prepare() {
    logger.info(this.user.name);
    this.message.to('wladinart@gmail.com')
  }
}