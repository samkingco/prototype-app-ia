import { AppState } from "..";
import { Account, Patient, Address, PaymentMethod } from "./fake-data";

export interface ComputedAccount extends Account {}

function getAccount(state: AppState): ComputedAccount {
  return state.account;
}

function activePatient(state: AppState): Patient {
  const account = getAccount(state);
  return account.patients[0];
}

function getPatient(state: AppState, patientId: string): Patient | undefined {
  const account = getAccount(state);
  return account.patients.find((p) => p.id === patientId);
}

function getDeliveryAddress(
  state: AppState,
  addressId: string
): Address | undefined {
  const account = getAccount(state);
  return account.deliveryAddresses.find((a) => a.id === addressId);
}

function listDeliveryAddresses(state: AppState): Address[] {
  const account = getAccount(state);
  return account.deliveryAddresses;
}

function getPaymentMethod(
  state: AppState,
  addressId: string
): PaymentMethod | undefined {
  const account = getAccount(state);
  return account.paymentMethods.find((a) => a.id === addressId);
}

function listPaymentMethods(state: AppState): PaymentMethod[] {
  const account = getAccount(state);
  return account.paymentMethods;
}

export const accountSelectors = {
  getAccount,
  getPatient,
  activePatient,
  getDeliveryAddress,
  listDeliveryAddresses,
  getPaymentMethod,
  listPaymentMethods,
};
