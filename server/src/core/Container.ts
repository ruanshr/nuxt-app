import fs from 'fs'
import path from 'path'
import BaseService from './BaseService'
import BaseController from './BaseController'
export default class Container {
  controllers: BaseController[] = []
  static services: Map<string, BaseService> = new Map<string, BaseService>()
  constructor() {
    this.controllers = [] 
  }

  async load(): Promise<Container>{
    await this.getServices()
    await this.getControllers()
    return this
  }

  private async getControllers(): Promise<Array<any>> {
    const files = fs.readdirSync(path.resolve(__dirname,'../controllers'))
    return Promise.all<BaseController>(files.map(filename => {
        return new Promise(resolve => {
            import(`../controllers/${filename}`).then(({ default: Ctor })=>{
                const ctor:typeof Ctor = new Ctor()
                this.controllers.push(ctor)
                resolve(ctor)
            })
        })
    }))
  }

  private async getServices(): Promise<Array<any>> {
    const files = fs.readdirSync(path.resolve(__dirname,'../services'))
    return Promise.all<BaseService>(files.map(filename => {
        return new Promise(resolve => {
            import(`../services/${filename}`).then(({ default: Service, instance })=>{
                filename = filename.replace('.js','')
                const serviceName = `${filename.substr(0,1).toLowerCase()}${filename.substr(1)}`
                Container.services.set(serviceName, instance)
                resolve(instance)
            })
        })
    }))
  }
}
