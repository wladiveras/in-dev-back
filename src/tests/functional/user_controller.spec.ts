import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('UsersController Test Suit', () => {

  test('Create a user account', async ({ client }) => {

    const user = await UserFactory.create()

    const response = await client
      .post('/api/v1/user')
      .json(user)

    response.assertStatus(200)
  })

  test('Access if user is logged in and return right data', async ({ assert, client }) => {

    const user = await UserFactory.create()

    const response = await client
      .get('/api/v1/user')
      .loginAs(user)

    assert.properties(
      response.body(),
      [
        'id',
        'name',
        'email',
        'createdAt',
        'updatedAt'
      ]
    )
    response.assertStatus(200)
  })

  test('Block access if user is not logged in', async ({ client }) => {

    const response = await client.get('/api/v1/user')

    response.assertStatus(401)
  })

})