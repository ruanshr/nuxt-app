import BaseService from '../core/BaseService'
import { IRouterContext } from 'koa-router'
import ApiResult from '../core/ApiResult'

export default class UserService extends BaseService {
  async addUser(req: IRouterContext): Promise<ApiResult> {
    return new ApiResult(true, '添加客户成功')
  }

  async getUserInfo(req: IRouterContext): Promise<ApiResult> {
    return new ApiResult(true, '获取客户成功', { name: '张三' })
  }

  async list(req: IRouterContext): Promise<ApiResult> {
    const customerList: any[] = [{ name: '张三' }, { name: '李四' }]
    return new ApiResult(true, '获取客户列表成功', { customerList })
  }

  async pageList(req: IRouterContext): Promise<ApiResult> {
    const customerList: any[] = [{ name: '张三' }, { name: '李四' }]
    return new ApiResult(true, '获取客户列表成功', {
      total: 2,
      list: customerList
    })
  }
}


export const instance = new UserService