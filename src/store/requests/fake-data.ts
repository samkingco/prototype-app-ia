import { subDays, subHours, addDays } from "date-fns";
import {
  Address,
  defaultAddress,
  defaultPaymentMethod,
} from "../account/fake-data";

type MedicationStatus = "in_stock" | "out_of_stock";

export type RequestStatus =
  | "never_requested"
  | "cancelled"
  | "not_sent"
  | "awaiting_rx"
  | "awaiting_payment"
  | "awaiting_stock"
  | "preparing"
  | "dispatched"
  | "delivered";

export type DeliveryPreference = "asap" | "together";

export interface Request {
  id: string;
  medicationIds: string[];
  medicationStockStatus: {
    [id: string]: MedicationStatus;
  };
  status: RequestStatus;
  lastStatusChange: number;
  deliveryAddressId: string;
  isLetterboxFriendly?: boolean;
  deliveryPreference?: DeliveryPreference;
  gpAddress?: Address;
  paymentMethodId: string;
  estimatedBackInStockDate?: number;
  hasBeenSplit?: boolean;
}

export const requestsFakeData: Request[] = [
  {
    id: "1",
    medicationIds: ["1"],
    medicationStockStatus: {
      "1": "in_stock",
    },
    status: "delivered",
    lastStatusChange: subDays(Date.now(), 11).getTime(),
    deliveryAddressId: defaultAddress.id,
    isLetterboxFriendly: true,
    paymentMethodId: defaultPaymentMethod.id,
  },
  {
    id: "2",
    medicationIds: ["3", "4"],
    medicationStockStatus: {
      "3": "out_of_stock",
      "4": "out_of_stock",
    },
    status: "dispatched",
    lastStatusChange: subDays(Date.now(), 2).getTime(),
    deliveryAddressId: defaultAddress.id,
    isLetterboxFriendly: true,
    paymentMethodId: defaultPaymentMethod.id,
    estimatedBackInStockDate: addDays(Date.now(), 2).getTime(),
  },
  {
    id: "3",
    medicationIds: ["5"],
    medicationStockStatus: {
      "5": "in_stock",
    },
    status: "delivered",
    lastStatusChange: subDays(Date.now(), 8).getTime(),
    deliveryAddressId: defaultAddress.id,
    isLetterboxFriendly: true,
    paymentMethodId: defaultPaymentMethod.id,
  },
  {
    id: "4",
    medicationIds: ["2"],
    medicationStockStatus: {
      "2": "in_stock",
    },
    status: "preparing",
    lastStatusChange: subHours(Date.now(), 2).getTime(),
    deliveryAddressId: defaultAddress.id,
    isLetterboxFriendly: true,
    paymentMethodId: defaultPaymentMethod.id,
  },
];
