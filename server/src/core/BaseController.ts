import router, { IRouterContext } from 'koa-router'
import Router from 'koa-router'
import ApiResult from './ApiResult'
export interface IHandler {
  (req: IRouterContext): Promise<ApiResult>
}

export function isIHandler(handler: any): handler is IHandler {
  return handler
}

export type TRoute = {
  method: TMethod
  path: string
  cb: IHandler
}

type TMethod = 'get' | 'post'
const BASE_API_URL = '/api'
export default class BaseController {
  prefix: string = '/base'
  router: Router
  _routes: TRoute[] = []
  get routes() {
    let routes: TRoute[] = this._routes
    if (!routes) {
      routes = this._routes = []
    }
    return routes
  }
  addRoute(route: TRoute) {
    const routes = this.routes
    routes.push(route)
  }
  constructor(prefix?: string) {
    this.prefix = prefix ? prefix : '/base'
    this.router = new Router({ prefix: `${BASE_API_URL}${this.prefix}` })
    this.registerCustomRoute()
    this.registerRoute()
  }

  registerRoute() {
    let routes = this.routes
    if (Object.getPrototypeOf(this).routes.length) {
      routes = Object.getPrototypeOf(this).routes
    }
    routes.forEach((route) => {
      this.register(route.method, route.path, route.cb)
    })
  }

  registerCustomRoute() {}

  /**
   * 路由注册RESTAPI 方法
   * @param {String} path 请求方法路径
   * @param {String} methodsName 方法名称
   */
  protected register(method: TMethod, path: string, cb: IHandler) {
    console.log(method, path, 'request===>', this.prefix)
    this.router[method](path, async (ctx: any, next) => {
      const req: IRouterContext = ctx.request
      const res: IRouterContext = ctx.response
      try {
        ctx.body = await cb(req)
      } catch (e) {
        console.error('错误请求:', ctx.url)
        console.log(e)
        ctx.body = e
      }
    })
  }

  buildErrorApiResult(e: any): ApiResult {
    return new ApiResult(false, '接口调用失败')
  }
}
