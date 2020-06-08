import fs from 'fs'
import path from 'path'
export default class Container {
  controllers: any[] = []
  services: any[] = []
  constructor() {
    this.controllers = []
    this.services = []
  }

  async load(): Promise<Container>{
    await this.getServices()
    await this.getControllers()
    return this
  }

  private async getControllers(): Promise<Array<any> {
    const files = fs.readdirSync(path.resolve(__dirname,'../controllers'))
    return Promise.all(files.map(filename => {
        return new Promise(resolve => {
            import(`../controllers/${filename}`).then(({ default: Ctor })=>{
                this.controllers.push(Ctor)
                resolve(Ctor)
            })
        })
    })
  }

  private async getServices(): Promise<Array<any>> {
    const files = fs.readdirSync(path.resolve(__dirname,'../services'))
    return Promise.all(files.map(filename => {
        return new Promise(resolve => {
            import(`../services/${filename}`).then(({ default: Service })=>{
                this.services.push(new Service())
                resolve(Service)
            })
        })
    })
  }
}


new Container()