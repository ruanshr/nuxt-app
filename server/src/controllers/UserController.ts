import BaseController from "../core/BaseController";
import { Controller } from "../core/Decorator";

@Controller('/user')
class UserController extends BaseController{
  constructor(prefix: string){
    super(prefix)
    console.log(this.prefix,'=====================')
  }

}

export default UserController