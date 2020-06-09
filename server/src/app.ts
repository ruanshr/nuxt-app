import Application from './core/Application' 

export default class App extends Application {
  constructor() {
    super()
     
  }
  async ready(): Promise<Application> {
    await this.load()
    return this.build()
  }
}
