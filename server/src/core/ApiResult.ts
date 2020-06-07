interface IApiResult {
  readonly success: boolean
  readonly msg: string
  readonly result: any
  readonly code: number
}

export default class ApiResult implements IApiResult {
  success: boolean
  msg: string
  result: any
  code: number
  constructor(success: boolean, msg: string, result?: any, code?: number) {
    this.success = success
    this.msg = msg
    this.result = result
    if (success) {
      this.code = 200
    } else {
      this.code = code || 500
    }
  }
}
