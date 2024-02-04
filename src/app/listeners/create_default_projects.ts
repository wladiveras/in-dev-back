import User from '#models/user'
import logger from '@adonisjs/core/services/logger'

export default class CreateDefaultProjects {
    handle(user: User) {
        // TODO: Criar um exemplo de projeto de exemplo
        logger.debug(`Project create to user: ${user.id}`)
    }
}