import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class CreateDefaultPosts {
    handle(user: User) {
        // TODO: Fazer uma post padrao de exemplo
        logger.debug(`Post created to user: ${user.id}`)
    }
}