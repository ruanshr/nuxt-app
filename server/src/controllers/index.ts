import UserController from './UserController'
import BaseController from '../core/BaseController'
import OrderController from './OrderController'

const controllers: Array<typeof BaseController> = []

controllers.push(UserController)
controllers.push(OrderController)

export function getRegisterController() {
  return controllers
}
