import { UUID, randomUUID } from 'crypto'

export class Person {
  #id: UUID
  #name: string
  #surname: string

  setPerson(name: string, surname: string, phone: Phone) {
    this.#id = randomUUID()
    this.#name = name
    this.#surname = surname
  }

  getPerson() {
    return this
  }
}
