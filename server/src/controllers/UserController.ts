import BaseController from '../core/BaseController'
import { Controller, Service, Post, Get } from '../core/Decorator'
import { IRouterContext } from 'koa-router'
import ApiResult from '../core/ApiResult'
import UserService from '../Services/UserService'
import { isServiceInstance } from '../core/BaseService'

@Controller('/user')
class UserController extends BaseController {
  @Service
  userService: UserService | null = null
  registerCustomRoute() {
    if (isServiceInstance(this.userService)) {
      this.register('post', '/addCustomer', this.userService.addCustomer)
    }
  }
  @Post('/getCustomerInfo')
  async getCustomerInfo(req: IRouterContext): Promise<ApiResult> {
    return new ApiResult(true, '调用成功', { name: '张三' })
  }

  @Get('/list')
  async list(req: IRouterContext): Promise<ApiResult> {
    try {
      if (this.userService) {
        return await this.userService.list(req)
      }
    } catch (e) {
      return this.buildErrorApiResult(e)
    }
    return this.buildErrorApiResult(null)
  }
}

export default UserController
