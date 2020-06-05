import UserController from "./UserController"
import BaseController from "../core/BaseController"


const controllers: Array<typeof BaseController> = []

controllers.push(UserController)

export function getRegisterController(){

  return controllers
}