import { Request, Response } from 'express'
import * as z from 'zod'
import { Phone } from '../entities/Phone'
import { ZodError } from '../entities/ZodError'
import { UUID } from 'crypto'
import { phones } from '../db/phones'

class PhoneController {
  createPhone = async (req: Request, res: Response) => {
    try {
      const bodyScheme = z.object({
        code: z.string(),
        number: z.string().min(8).max(9),
        cel: z.boolean(),
      })

      const { code, cel, number } = bodyScheme.parse(req.body)

      const newPhone = new Phone()
      newPhone.setPhone(code, number, cel)

      phones.push(newPhone)

      return res.status(201).send(newPhone.getPhone())
    } catch (e) {
      const error = e as ZodError
      const message = `${error.name}: ${error.issues[0].path[0]} ${error.issues[0].message}`
      return res.status(400).send(message)
    }
  }

  listPhones = async (req: Request, res: Response) => {
    const data = phones.map((p) => p.getPhone())
    return res.status(200).send(data)
  }

  getPhoneById(id: UUID) {
    const phone = phones.find((e) => e.getPhone().id.includes(id))
    return phone
  }

  updatePhone = async (req: Request, res: Response) => {
    const { id } = req.params

    const bodyScheme = z.object({
      code: z.string().optional(),
      number: z.string().min(8).max(9).optional(),
      cel: z.boolean().optional(),
    })

    const { code, cel, number } = bodyScheme.parse(req.body)

    const indexOf = phones.findIndex((e) => e.getPhone().id.includes(id))

    if (indexOf > -1) {
      phones[indexOf].setPhone(code, number, cel)
      return res.status(200).send(phones[indexOf].getPhone())
    }

    return res.status(404).send('Phone not found')
  }

  deletePhone = async (req: Request, res: Response) => {
    const { id } = req.params

    const indexOf = phones.findIndex((e) => e.getPhone().id.includes(id))

    if (indexOf > -1) {
      phones.splice(indexOf, 1)
      return res.status(200).send()
    }

    return res.status(404).send('Phone not found')
  }
}

export const phoneController = new PhoneController()
