import {faker} from '@faker-js/faker';

export default function studentFactory(number = 1) {
  return Array.from(Array(number), () => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number()
    };
  });
}
