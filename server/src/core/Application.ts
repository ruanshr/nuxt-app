import BaseController from "./BaseController"
export default class Application {
  controllers: Array<typeof BaseController> = []
  constructor(){

  }
  setControllers(Ctors: Array<typeof BaseController>){
    this.controllers.push(...Ctors)
  }

  registerController(): Application{ 
    console.log('<<<<<<<<<<<')
    this.controllers.forEach(Ctor => {
      new Ctor('')
    })
    return this
  }
  build(): Application {
    console.log('>>>>>>>>>>')
    this.registerController()
    return this
  }
}
