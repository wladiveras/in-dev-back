// Core
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

// Events 
import UserRegistered from '#events/user_registered'

// Models
import User from '#models/user'

// Validators
import {
  AuthValidator,
  createUserValidator,
  updateUserValidator
} from '#validators/user'


// Controller 
export default class UsersController {

  async index({ auth }: HttpContext) {

    const user = auth.getUserOrFail();
    logger.info('Returning data from user id %s.', user.id)
    return user;
  }

  async show({ }: HttpContext) { }

  async store({ request }: HttpContext) {

    const payload = await request.validateUsing(createUserValidator)

    logger.info('Creating a account to %s.', payload.email)

    const data = {
      name: payload.name,
      password: payload.password
    }

    const user = await User.firstOrCreate({ email: payload.email }, data)
    UserRegistered.dispatch(user)
  }

  async update({ request }: HttpContext) {

    const payload = await request.validateUsing(updateUserValidator)
    return payload
  }

  async destroy({ request }: HttpContext) {
    return request
  }

  async token({ request }: HttpContext) {
    const payload = await request.validateUsing(AuthValidator)
    logger.info('Request a auth token to email %s.', payload.email)
    logger.debug('Request a auth token to email %s.', payload.email)
    logger.error({ err: payload.password }, 'Something went wrong')
    logger.fatal({ err: payload.password }, 'Something went wrong')
    logger.warn({ err: payload.password }, 'Something went wrong')
    logger.trace({ err: payload.password }, 'Something went wrong')

    const user = await User.verifyCredentials(payload.email, payload.password)

    const token = await User.accessTokens.create(user)
    return token

  }

}