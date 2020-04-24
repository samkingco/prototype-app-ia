import { subDays } from "date-fns";

export type NotificationType =
  | "dispatch"
  | "rx_returned"
  | "stock_update"
  | "request_rx";

export interface Notification {
  id: string;
  type: NotificationType;
  subjectLine?: string;
  sendDate: number;
  hasBeenRead?: boolean;
  hasBeenDone?: boolean;
  doneDate?: number;
  chosenAction?: string;
  patientId: string;
  medicationIds?: string[];
  requestId?: string;
  prescriptionSerial?: string;
}

export const notificationsFakeData: Notification[] = [
  {
    id: "1",
    type: "request_rx",
    sendDate: subDays(Date.now(), 11).getTime(),
    patientId: "1",
    medicationIds: ["2", "4", "5"],
    hasBeenDone: true,
    doneDate: subDays(Date.now(), 8).getTime(),
    hasBeenRead: true,
  },
  {
    id: "2",
    type: "dispatch",
    sendDate: subDays(Date.now(), 2).getTime(),
    patientId: "1",
    requestId: "2",
  },
  {
    id: "3",
    type: "rx_returned",
    sendDate: subDays(Date.now(), 12).getTime(),
    patientId: "1",
    prescriptionSerial: "2E206E-G85043-20F09P",
    medicationIds: ["2"],
    hasBeenRead: true,
  },
];
