import { Person } from '../../src/entities/Person'
import { Phone } from '../../src/entities/Phone'

describe(`${Person.name}`, () => {
  it('Should test setPerson and getPerson methods', () => {
    const mockPhone = new Phone()
    mockPhone.setPhone('19', '9921234567', true)

    const mock = {
      name: 'John',
      surname: 'Doe',
      phone: mockPhone,
    }

    const person = new Person()
    person.setPerson(mock.name, mock.surname, mock.phone)

    const response = person.getPerson()

    expect(response.id).toBeTruthy()
    expect(response.name).toBe(mock.name)
    expect(response.surname).toBe(mock.surname)
    expect(response.phone.code).toBe(mock.phone.getPhone().code)
    expect(response.phone.number).toBe(mock.phone.getPhone().number)
    expect(response.phone.cel).toBe(mock.phone.getPhone().cel)
  })

  it('Should test setPerson method with empty parameters', () => {
    const mockPhone = new Phone()
    mockPhone.setPhone('19', '9921234567', true)

    const mock = {
      name: 'John',
      surname: 'Doe',
      phone: mockPhone,
    }

    const person = new Person()
    person.setPerson(mock.name, mock.surname, mock.phone)

    const newMockValue = {
      name: undefined,
      surname: undefined,
      phone: undefined,
    }

    person.setPerson(
      newMockValue.name,
      newMockValue.surname,
      newMockValue.phone,
    )

    const response = person.getPerson()

    expect(response.id).toBeTruthy()
    expect(response.name).toBe(mock.name)
    expect(response.surname).toBe(mock.surname)
    expect(response.phone.code).toBe(mock.phone.getPhone().code)
    expect(response.phone.number).toBe(mock.phone.getPhone().number)
    expect(response.phone.cel).toBe(mock.phone.getPhone().cel)
  })

  it('Should test Person withou phone', () => {
    const mock = {
      name: 'John',
      surname: 'Doe',
    }

    const person = new Person()

    person.setPerson(mock.name, mock.surname, null)

    const response = person.getPerson()
    expect(response.id).toBeTruthy()
    expect(response.name).toBe(mock.name)
    expect(response.surname).toBe(mock.surname)
    expect(response.phone).toBeNull()
  })
})
