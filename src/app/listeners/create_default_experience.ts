import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class CreateDefaultExperience {
    handle(user: User) {
        // TODO: Criar um exemplo de experiencia de exemplo
        logger.debug(`Experience created to user: ${user.id}`)
    }
}