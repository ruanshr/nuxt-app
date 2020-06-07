import Application from './core/Application'

import { getRegisterController } from './controllers'
import { getRegisterServices } from './services'
import BaseController from './core/BaseController'

export default class App extends Application {
  constructor() {
    super()
    this.initServices(getRegisterServices())
    this.initControllers(getRegisterController())
  }
  ready() {
    this.build()
  }
}
