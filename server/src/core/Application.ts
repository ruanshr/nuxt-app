import BaseController from './BaseController'
import BaseService from './BaseService'
export default class Application {
  controllerInstances: BaseController[] = []
  constructor() {}
  static services: Map<string, BaseService> = new Map<string, BaseService>()
  static getService(name: string): BaseService {
    const instance = Application.services.get(name)
    if (!instance) {
      throw Error(`实例${name}不存在`)
    }
    return instance
  }
  initControllers(controllers: Array<typeof BaseController>): Application {
    controllers.forEach((Ctor: typeof BaseController) => {
      const instance = new Ctor()
      this.controllerInstances.push(instance)
    })
    return this
  }

  initServices(services: Array<typeof BaseService>): Application {
    services.forEach((S: typeof BaseService) => {
      const name = S.name
      const instName = `${name.substr(0, 1).toLowerCase()}${name.substr(1)}`
      Application.services.set(instName, new S())
    })
    return this
  }

  build(): Application {
    return this
  }
}