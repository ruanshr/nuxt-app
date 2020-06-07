import BaseController from '../core/BaseController'
import { Controller, Post } from '../core/Decorator'
import { IRouterContext } from 'koa-router'
import ApiResult from '../core/ApiResult'
@Controller('/order')
export default class OrderController extends BaseController {
  @Post('/list')
  async list(req: IRouterContext): Promise<ApiResult> {
    return new ApiResult(true, '')
  }
}
