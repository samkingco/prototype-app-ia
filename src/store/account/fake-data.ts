export type AddressType = "delivery" | "collection" | "gp";

export interface Address {
  id: string;
  type: AddressType;
  name?: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  phone?: string;
  isDefault?: boolean;
}

export type PaymentMethodType = "Visa" | "Mastercard";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  cardNumber: string;
  isDefault?: boolean;
}

export type PatientGender =
  | "Male"
  | "Female"
  | "Non-binary"
  | "None"
  | undefined;

export interface Patient {
  id: string;
  isPrimaryPatient?: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth?: number;
  gender: PatientGender;
  nhsNumber: string;
  gpSurgery: Address;
}

export interface Account {
  emailAddress: string;
  name: string;
  patients: Patient[];
  deliveryAddresses: Address[];
  paymentMethods: PaymentMethod[];
}

const AddressBook: Address[] = [
  {
    id: "1",
    type: "delivery",
    line1: "Flat 8",
    line2: "Walnut Tree Close",
    city: "Guildford",
    postcode: "GU1 4UL",
    isDefault: true,
  },
  {
    id: "2",
    type: "delivery",
    line1: "Flat 12",
    line2: "290 Mare Street",
    city: "London",
    postcode: "E8 1HE",
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
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  gender: undefined,
  nhsNumber: "4444532558",
  gpSurgery: {
    id: "gp_1",
    type: "gp",
    name: "Crown Heights Medical Centre",
    line1: "80 Broadway Market",
    city: "London",
    postcode: "E8 1JK",
    phone: "01482 363 727",
  },
};

export const accountFakeData: Account = {
  emailAddress: "sam.king@gmail.com",
  name: "",
  patients: [FakePatient],
  deliveryAddresses: AddressBook,
  paymentMethods: Wallet,
};

export const defaultAddress =
  accountFakeData.deliveryAddresses.find((a) => a.isDefault) ||
  accountFakeData.deliveryAddresses[0];

export const defaultPaymentMethod =
  accountFakeData.paymentMethods.find((a) => a.isDefault) ||
  accountFakeData.paymentMethods[0];
