import { ObjectHelpers, ArrayHelpers } from '@igortrindade/lazyfy'
import Validators from '@/util/validators'

export default class BaseModel {

  [key: string]: any;

  public get fillable (): Array<string> {
    return []
  }

  public getFillableKeys(data?: any) {
    return ObjectHelpers.filterObjectKeys(this.fillable, data || this)
  }

  constructor(args: any = {}) {
    this.setFillableKeys(args)
  }

  public setFillableKeys(args: any) {
    for(const key of this.fillable) {
      if(args[key] !== undefined) {
        this[key] = args[key]
      }
    }
  }

  get errors() {
    return this.requireds.filter((req: any) => {

      if (typeof (req.validator) === 'function') {
        return req.validator(this[req.item], this)
      } else if (Array.isArray(req.validator)) {
        for(const currentValidator of req.validator) {
          if(currentValidator(this[req.item], this)) return true
        }
      }

      if (
        typeof (this[req.item]) == 'string' && !this[req.item].length
        || Array.isArray(this[req.item]) && !this[req.item].length
        || typeof (this[req.item]) == 'object' && !this[req.item]
      ) {
        return true
      }

      return false
    }).map((item: any) => {
      return { item: item.item, label: item.label }
    })
  }

  get hasError(){
    return (this.errors.length) ? true : false
  }

  get errorPhrase() {
    return {
      init: 'Por favor, verifique os itens ',
      end: ' para continuar.'
    }
  }

  get validationPhrase() {
    return this.errorPhrase.init + this.errors.map((erro: any) => erro.label ? erro.label : erro.item).join(', ') + this.errorPhrase.end
  }

  get validationPhraseHtml() {
    return `${this.errorPhrase.init} <b>${this.errors.map((erro: any) => erro.label).join(', ')}</b> ${this.errorPhrase.end}`
  }

  validateInput(input: any) {
    return ArrayHelpers.find(this.errors, { item: input }) ? true : false
  }

}
