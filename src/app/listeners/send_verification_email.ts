import User from '#models/user'

import mail from '@adonisjs/mail/services/main'
import VerifyEmailNotification from '#mails/verify_e_notification'


export default class SendVerificationEmail {
    async handle(user: User) {
        await mail.sendLater(new VerifyEmailNotification(user.user))
    }
}