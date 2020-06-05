import BaseController from "./BaseController";

export function Controller(prefix: string){
  return function(Ctor: typeof BaseController): typeof Ctor{
    class subCtor extends Ctor{
      constructor() {
        super(prefix)
      }
    }

    return subCtor
  }
}


export function Post(path: string){
  return function(){

  }
}