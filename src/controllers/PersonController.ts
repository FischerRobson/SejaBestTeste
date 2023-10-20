import { Request, Response } from 'express'
import * as z from 'zod'
import { Person } from '../entities/Person'
import { ZodError } from '../entities/ZodError'
import { Phone } from '../entities/Phone'
import { persons } from '../db/persons'
import { phones } from '../db/phones'

class PersonController {
  createPerson = async (req: Request, res: Response) => {
    try {
      const bodyScheme = z.object({
        name: z.string(),
        surname: z.string(),
        phone: z
          .object({
            code: z.string(),
            number: z.string().min(8).max(9),
            cel: z.boolean(),
          })
          .optional(),
      })

      const { name, surname, phone } = bodyScheme.parse(req.body)
      const person = new Person()
      let personPhone: Phone = null
      if (phone) {
        const { code, number, cel } = phone
        personPhone = new Phone()
        personPhone.setPhone(code, number, cel)
        phones.push(personPhone)
      }
      person.setPerson(name, surname, personPhone)

      persons.push(person)
      return res.status(201).send(person.getPerson())
    } catch (e) {
      const error = e as ZodError
      const message = `${error.name}: ${error.issues[0].path[0]} ${error.issues[0].message}`
      return res.status(400).send(message)
    }
  }

  listPersons = async (req: Request, res: Response) => {
    const data = persons.map((p) => p.getPerson())
    return res.status(200).send(data)
  }

  updatePerson = async (req: Request, res: Response) => {
    const { id } = req.params

    const bodyScheme = z.object({
      name: z.string().optional(),
      surname: z.string().optional(),
    })

    const { name, surname } = bodyScheme.parse(req.body)

    const indexOf = persons.findIndex((e) => e.getPerson().id.includes(id))

    if (indexOf > -1) {
      const phone = persons[indexOf].getPerson().phone
      persons[indexOf].setPerson(name, surname, phone as unknown as Phone)
      return res.status(200).send(persons[indexOf].getPerson())
    }

    return res.status(404).send('Person not found')
  }

  linkPersonToPhone = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const bodyScheme = z.object({
        phoneId: z.string().uuid(),
      })

      const { phoneId } = bodyScheme.parse(req.body)

      const indexOfPerson = persons.findIndex((e) =>
        e.getPerson().id.includes(id),
      )

      if (indexOfPerson > -1) {
        const indexOfPhone = phones.findIndex((e) =>
          e.getPhone().id.includes(phoneId),
        )

        const linkedPhone = phones[indexOfPhone].getPhone()

        if (indexOfPhone > -1) {
          persons[indexOfPerson].setPerson(
            undefined,
            undefined,
            linkedPhone as unknown as Phone,
          )
          return res.status(200).send()
        } else {
          return res.status(404).send('Phone not found')
        }
      }
    } catch (e) {
      const error = e as ZodError
      const message = `${error.name}: ${error.issues[0].path[0]} ${error.issues[0].message}`
      return res.status(400).send(message)
    }
  }

  deletePerson = async (req: Request, res: Response) => {
    const { id } = req.params

    const indexOf = persons.findIndex((e) => e.getPerson().id.includes(id))

    if (indexOf > -1) {
      persons.splice(indexOf, 1)
      return res.status(200).send()
    }

    return res.status(404).send('Person not found')
  }
}

export const personController = new PersonController()
