import { UUID, randomUUID } from 'crypto'

export class Phone {
  #id: UUID
  #code: string
  #number: string
  #cel: boolean

  setPhone(code: string, number: string, cel: boolean) {
    this.#id = randomUUID()
    this.#code = code
    this.#number = number
    this.#cel = cel
    console.log('setPhone')
    console.log(this)
  }

  getPhone() {
    return `${this.#id}: ${this.#code} ${this.#number}`
  }

  isCel() {
    return this.#cel
  }
}
