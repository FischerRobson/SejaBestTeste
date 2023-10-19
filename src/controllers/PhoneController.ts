import { Request, Response } from 'express'
import * as z from 'zod'
import { Phone } from '../entities/Phone'

class PhoneController {
  #phones: Phone[]

  constructor() {
    this.#phones = []
  }

  createPhone = async (req: Request, res: Response) => {
    const bodyScheme = z.object({
      code: z.string(),
      number: z.string().min(8).max(9),
      cel: z.boolean(),
    })

    const { code, cel, number } = bodyScheme.parse(req.body)
    console.log(code, cel, number)

    const newPhone = new Phone()
    newPhone.setPhone(code, number, cel)

    console.log(this)

    this.#phones.push(newPhone)
    return res.status(201).send(newPhone.getPhone())
  }
}

export const phoneController = new PhoneController()
