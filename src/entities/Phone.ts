import { UUID, randomUUID } from 'crypto'

export class Phone {
  #id: UUID
  #code: string
  #number: string
  #cel: boolean

  setPhone(code: string, number: string, cel: boolean) {
    this.#id = this.#id || randomUUID()
    this.#code = code || this.#code
    this.#number = number || this.#number
    this.#cel = cel || this.#cel
  }

  getPhone() {
    return {
      id: this.#id,
      code: this.#code,
      number: this.#number,
      cel: this.isCel(),
      getPhone: function () {
        return {
          id: this.id,
          code: this.code,
          number: this.number,
          cel: this.cel,
        }
      },
    }
  }

  isCel() {
    return this.#cel === true
  }
}
