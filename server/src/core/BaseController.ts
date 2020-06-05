import router, { IRouterContext } from 'koa-router'
import Router from 'koa-router'
import ApiResult from './ApiResult'
interface IHandler{
  (req: IRouterContext): Promise<ApiResult>
}
const BASE_API_URL = '/api'
export default class BaseController {
  prefix: string
  router: Router
  constructor(prefix: string){
    this.prefix = prefix
    this.router = new Router({ prefix: `${BASE_API_URL}${this.prefix}` })
  }
  /**
   * 路由注册RESTAPI 方法
   * @param {String} path 请求方法路径
   * @param {String} methodsName 方法名称
   */
  register(method: string,path: string, cb: IHandler) {
    if(method.toLowerCase() === 'get'){
      this.registerGet(path, cb)
    } else {
      this.registerPost(path, cb)
    }
  }

  /**
   * 路由注册RESTAPI 方法
   * @param {String} path 请求方法路径
   * @param {String} methodsName 方法名称
   */
  registerPost(path: string, cb: IHandler) {
    this.router.post(path, async (ctx: any, next) => {
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

  /**
   * 路由注册RESTAPI 方法
   * @param {String} path 请求方法路径
   * @param {String} methodsName 方法名称
   */
  registerGet(path: string, cb: IHandler) {
    this.router.get(path, async (ctx: any, next) => {
      const req: IRouterContext = ctx.request
      const res: IRouterContext = ctx.response
      try {
        ctx.body = await cb(req)
      } catch (e) {
        console.error('错误请求:', ctx.url)
        ctx.body = e
      }
    })
  }
}
