import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Controllers 
const UsersController = () => import('#controllers/users_controller')

// Group all api endpoints
router.group(
  () => {

    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    // UsersController
    router.group(
      () => {
        router.post('/token', [UsersController, 'token'])
        router.post('/', [UsersController, 'store'])

        // Require Auth
        router.group(
          () => {
            router.get('/', [UsersController, 'index'])
            router.get('/:id', [UsersController, 'show'])
            router.put('/:id', [UsersController, 'update'])
            router.delete('/:id', [UsersController, 'destroy'])
          })
          .use(middleware.auth())
      })
      .prefix('/user')

    // TasksController
    router.group(
      () => {

      })
      .prefix('/task')
  })
  .prefix('/api/v1')





