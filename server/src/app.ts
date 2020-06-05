import Application from "./core/Application";

import { getRegisterController } from "./controllers"
import BaseController from "./core/BaseController";

const Ctors:Array<typeof BaseController> = getRegisterController()
export default class App extends Application{
  constructor(){
    super()
    this.setControllers(Ctors)
  }
  ready() {
    this.build()
  }
  
}

new App().ready()