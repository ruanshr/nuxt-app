import BaseService from '../core/BaseService'
import UserService from './UserService'

export function getRegisterServices(): Array<typeof BaseService> {
  const services: Array<typeof BaseService> = []
  services.push(UserService)
  return services
}
