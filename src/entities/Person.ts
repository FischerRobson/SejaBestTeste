import { UUID, randomUUID } from 'crypto'
import { Phone } from './Phone'

export class Person {
  #id: UUID
  #name: string
  #surname: string
  #phone: Phone | null

  setPerson(name: string, surname: string, phone: Phone | null) {
    this.#id = this.#id || randomUUID()
    this.#name = name || this.#name
    this.#surname = surname || this.#surname
    this.#phone = phone || this.#phone
  }

  getPerson() {
    return {
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      phone: this.#phone ? this.#phone.getPhone() : null,
    }
  }
}
