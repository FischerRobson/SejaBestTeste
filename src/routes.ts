import { Request, Response, Router } from 'express'
import { phoneController } from './controllers/PhoneController'

export const router = Router()

const PHONES_ENDPOINT = '/phones'
const PERSONS_ENDPOINT = '/persons'

router.get('/hello', (req: Request, res: Response) => {
  return res.status(200).send('Hello world')
})

router.post(PHONES_ENDPOINT, phoneController.createPhone)
