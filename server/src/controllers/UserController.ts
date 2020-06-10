import BaseController from '../core/BaseController'
import { Controller, Service, Post, Get } from '../core/Decorator'
import { IRouterContext } from 'koa-router'
import ApiResult from '../core/ApiResult'
import UserService, { instance } from '../Services/UserService'

@Controller('/user')
class UserController extends BaseController {
  @Service
  userService: UserService = instance
  registerCustomRoute() {
    this.register('post', '/pageList', this.userService.pageList)
  }
  @Post('addUser')
  async addUser(req: IRouterContext): Promise<ApiResult> {
    try {
      return this.userService.addUser(req)
    } catch (e) {
      console.error(e)
    }
    return this.buildApiResult(false,'添加客户失败')
  }

  @Get('/getUser')
  async getCustomerInfo(req: IRouterContext): Promise<ApiResult> {
    try {
      return this.userService.getUserInfo(req)
    } catch (e) {
      console.error(e)
    }
    return this.buildApiResult(false, '获取客户信息失败')
  }

  @Get('/list')
  async list(req: IRouterContext): Promise<ApiResult> {
    try {
      return await this.userService.list(req)
    } catch (e) {
      console.error(e)
    }
    return this.buildApiResult(false, '获取客户列表失败')
  }
}

export default UserController
