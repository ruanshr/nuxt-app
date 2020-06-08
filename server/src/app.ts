import Application from './core/Application'

import { getRegisterController } from './controllers'
import { getRegisterServices } from './services'

export default class App extends Application {
  constructor() {
    super()
    this.initServices(getRegisterServices())
    this.initControllers(getRegisterController())
  }
  ready(): Application {
    return this.build()
  }
}
