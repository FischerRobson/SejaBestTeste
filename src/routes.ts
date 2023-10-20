import { Request, Response, Router } from 'express'
import { phoneController } from './controllers/PhoneController'
import { personController } from './controllers/PersonController'

export const router = Router()

const PHONES_ENDPOINT = '/phones'
const PERSONS_ENDPOINT = '/persons'

router.get('/hello', (req: Request, res: Response) => {
  return res.status(200).send('Hello world')
})

router.get(PHONES_ENDPOINT, phoneController.listPhones)
router.post(PHONES_ENDPOINT, phoneController.createPhone)
router.put(`${PHONES_ENDPOINT}/:id`, phoneController.updatePhone)
router.delete(`${PHONES_ENDPOINT}/:id`, phoneController.deletePhone)

router.get(PERSONS_ENDPOINT, personController.listPersons)
router.post(PERSONS_ENDPOINT, personController.createPerson)
router.put(`${PERSONS_ENDPOINT}/:id`, personController.updatePerson)
router.patch(`${PERSONS_ENDPOINT}/:id`, personController.linkPersonToPhone)
router.delete(`${PERSONS_ENDPOINT}/:id`, personController.deletePerson)
