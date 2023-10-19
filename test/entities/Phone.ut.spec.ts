import { Phone } from '../../src/entities/Phone'

describe(`${Phone.name}`, () => {
  it('Should test setPhone and getPhone methods', () => {
    const mockPhone = new Phone()
    mockPhone.setPhone('19', '9921234567', true)

    const response = mockPhone.getPhone()

    expect(response.id).toBeTruthy()
    expect(response.cel).toBe(mockPhone.getPhone().cel)
    expect(response.code).toBe(mockPhone.getPhone().code)
    expect(response.number).toBe(mockPhone.getPhone().number)
  })
})
