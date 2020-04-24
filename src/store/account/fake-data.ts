import { p1Account } from "./participant-1";

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

export const accountFakeData = p1Account;

export const defaultAddress =
  accountFakeData.deliveryAddresses.find((a) => a.isDefault) ||
  accountFakeData.deliveryAddresses[0];

export const defaultPaymentMethod =
  accountFakeData.paymentMethods.find((a) => a.isDefault) ||
  accountFakeData.paymentMethods[0];
