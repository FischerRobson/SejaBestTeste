import { Request, Response } from 'express'
import {
  PhoneController,
  phoneController,
} from '../../src/controllers/PhoneController'
import { phones } from '../../src/db/phones'
import { Phone } from '../../src/entities/Phone'

describe(`${PhoneController.name}`, () => {
  it(`Should test ${phoneController.createPhone.name}`, async () => {
    const req: Partial<Request> = {
      body: {
        code: '123',
        number: '123456789',
        cel: true,
      },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.createPhone(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.send).toHaveBeenCalledWith(expect.any(Object))
  })

  it(`Should test ${phoneController.createPhone.name} with invalid body`, async () => {
    const req: Partial<Request> = {
      body: {
        code: '123',
        number: '12345',
      },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.createPhone(req as Request, res as Response)

    // Add your assertions here
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith(expect.any(String))
  })

  it(`Should test ${phoneController.listPhones.name}`, async () => {
    const req: Partial<Request> = {
      query: {
        id: null,
      },
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.listPhones(req as Request, res as Response)

    expect(res.send).toHaveBeenCalledWith(expect.any(Array))
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it(`Should test ${phoneController.listPhones.name} with an id`, async () => {
    const mockedPhone = new Phone()
    mockedPhone.setPhone('19', '992988998', true)

    phones.push(mockedPhone)

    const req: Partial<Request> = {
      query: {
        id: mockedPhone.getPhone().id,
      },
    }

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.listPhones(req as Request, res as Response)

    expect(res.send).toHaveBeenCalledWith(expect.any(Object))
    expect(res.status).toHaveBeenCalledWith(200)
  })

  it(`Should test ${phoneController.updatePhone.name}`, async () => {
    const code = '123'
    const number = '123456789'
    const cel = true

    const expectedPhone = new Phone()
    expectedPhone.setPhone(code, number, cel)

    const req: Partial<Request> = {
      params: { id: expectedPhone.getPhone().id },
      body: {
        code,
        number,
        cel,
      },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    phones.push(expectedPhone)

    await phoneController.updatePhone(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    // expect(res.send).toHaveBeenCalledWith(expectedPhone.getPhone())
  })

  it(`Should test ${phoneController.updatePhone.name} with no registered phone`, async () => {
    const req: Partial<Request> = {
      params: { id: '1111111111111' },
      body: {
        code: '1',
        number: '123456789',
        cel: true,
      },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.updatePhone(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('Phone not found')
  })

  it(`Should test ${phoneController.deletePhone.name}`, async () => {
    const code = '123'
    const number = '123456789'
    const cel = true

    const expectedPhone = new Phone()
    expectedPhone.setPhone(code, number, cel)

    const req: Partial<Request> = {
      params: { id: expectedPhone.getPhone().id },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    phones.push(expectedPhone)

    await phoneController.deletePhone(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalled()
  })

  it(`Should test ${phoneController.deletePhone.name} with no registered phone`, async () => {
    const req: Partial<Request> = {
      params: { id: '1111111111111' },
    }
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await phoneController.deletePhone(req as Request, res as Response)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith('Phone not found')
  })
})
