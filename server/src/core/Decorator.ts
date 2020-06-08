import BaseController, { isIHandler, TRoute } from './BaseController'
import { IRouterContext } from 'koa-router'
import ApiResult from './ApiResult'
import Application from './Application'
type Constructor<T = {}> = new (...args: any[]) => T

export function Controller(prefix: string) {
  return function decorator<TBase extends Constructor>(
    Ctor: TBase
  ): typeof Ctor {
    return class extends Ctor {
      constructor(...args: any[]) {
        super(prefix)
      }
    }
  }
}

export function Post(path: string) {
  return function(
    target: BaseController,
    propertyKey: keyof typeof target,
    propDescriptor: TypedPropertyDescriptor<
      (req: IRouterContext) => Promise<ApiResult>
    >
  ) {
    if (isIHandler(propDescriptor.value)) {
      const cb = target[propertyKey]
      if(isIHandler(cb)){
        const route: TRoute = {
          method: 'post',
          path,
          cb: cb.bind(target)
        }
        target.addRoute(route)
      } 
      // target.register('post', path , propDescriptor.value.bind(target) )
    }
    const descorator: TypedPropertyDescriptor<(
      req: IRouterContext,
      params?: object
    ) => Promise<ApiResult>> = {
      get(): (req: IRouterContext) => Promise<ApiResult> {
        return async (req: IRouterContext) => new ApiResult(true, '模拟')
      },
      set(value: object) {
        console.log('set', value)
      }
    }
    return descorator
  }
}

export function Get(path: string) {
  return function(
    target: BaseController,
    propertyKey: string,
    propDescriptor: TypedPropertyDescriptor<
      (req: IRouterContext) => Promise<ApiResult>
    >
  ) {
    if (isIHandler(propDescriptor.value)) {
      const route: TRoute = {
        method: 'get',
        path: `/${propertyKey}`,
        cb: propDescriptor.value
      }
      target.addRoute(route)
      // target.register('post', path , propDescriptor.value.bind(target) )
    }
    const descorator: TypedPropertyDescriptor<(
      req: IRouterContext,
      params?: object
    ) => Promise<ApiResult>> = {
      get(): (req: IRouterContext) => Promise<ApiResult> {
        return async (req: IRouterContext) => new ApiResult(true, '模拟')
      },
      set(value: object) {
        console.log('set', value)
      }
    }
    return descorator
  }
}

export function Service(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get: () => {
      return Application.getService(propertyKey)
    },
    set: () => {}
  })
}
