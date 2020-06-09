import Container from './Container'
import BaseService from './BaseService'

export default class Application {
  container: Container
  constructor() {
    this.container = new Container()
  }
  get controllers(){
    return this.container.controllers
  }
  async load(): Promise<Application> {
    await this.container.load()
    return this
  }
  build(): Application {
    return this
  }
}