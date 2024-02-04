import vine from '@vinejs/vine'


export const AuthValidator = vine.compile(
    vine.object({
        email: vine.string().trim().email().minLength(6),
        password: vine.string().trim().escape().minLength(6)
    })
)

export const createUserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(5),
        email: vine.string().trim().email().minLength(6),
        password: vine.string().trim().escape().minLength(6)
    })
)

export const updateUserValidator = vine.compile(
    vine.object({
        name: vine.string().trim().minLength(5),
        password: vine.string().trim().escape().minLength(6)
    })
)