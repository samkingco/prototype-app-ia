import { Account, Address, PaymentMethod, Patient } from "./fake-data";

const AddressBook: Address[] = [
  {
    id: "1",
    type: "delivery",
    line1: "29 Walnut Tree Close",
    line2: "",
    city: "Guildford",
    postcode: "GU1 4KJ",
    isDefault: true,
  },
];

const Wallet: PaymentMethod[] = [
  {
    id: "1",
    type: "Visa",
    cardNumber: "4278",
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    cardNumber: "6351",
  },
];

const FakePatient: Patient = {
  id: "1",
  isPrimaryPatient: true,
  firstName: "Ashley",
  lastName: "Hatton",
  dateOfBirth: new Date("1992-04-07").getTime(),
  gender: "Male",
  nhsNumber: "4733689923",
  gpSurgery: {
    id: "gp_1",
    type: "gp",
    name: "Winchmore Hill Practice",
    line1: "Austen Road",
    line2: "Winchmore Hill",
    city: "Guildford",
    postcode: "GU2 2EE",
    phone: "01483 505000",
  },
};

export const p1Account: Account = {
  emailAddress: "ashley.hatton@gmail.com",
  name: "Ashley Hatton",
  patients: [FakePatient],
  deliveryAddresses: AddressBook,
  paymentMethods: Wallet,
};
