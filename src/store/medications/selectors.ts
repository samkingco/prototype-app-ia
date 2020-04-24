import pluralize from "pluralize";
import { AppState } from "..";
import { Medication } from "./fake-data";
import { RequestStatus } from "../requests/fake-data";
import { requestSelectors } from "../requests/selectors";

function getAmountPerDay(medication: Medication): number | undefined {
  if (!medication.doseScheduleTimes) {
    return;
  }

  let totalAmount = 0;

  for (const timeOfDay of Object.keys(medication.doseScheduleTimes)) {
    const scheduledTime = medication.doseScheduleTimes[timeOfDay];
    totalAmount += scheduledTime.amount;
  }

  return totalAmount;
}

function getAmountRemainingInDays(medication: Medication): number | undefined {
  const amountPerDay = getAmountPerDay(medication);

  if (!amountPerDay) {
    return;
  }

  return Math.ceil(medication.amountRemaining / amountPerDay);
}

interface LiveDoseScheduleItem {
  medicationId: string;
  timeOfDay: string;
  instruction: string;
  hasTaken: boolean;
  takenTime: string;
}

function getLiveDoseSchedule(
  medication: Medication
): LiveDoseScheduleItem[] | undefined {
  if (!medication.doseScheduleTimes) {
    return;
  }

  let schedule: LiveDoseScheduleItem[] = [];

  for (const timeOfDay of Object.keys(medication.doseScheduleTimes)) {
    const scheduledTime = medication.doseScheduleTimes[timeOfDay];
    const instruction = `Take ${scheduledTime.amount} ${pluralize(
      medication.form,
      scheduledTime.amount
    )}`;
    const hasTaken = scheduledTime.taken;
    const takenTime = hasTaken
      ? `${scheduledTime.amount} ${pluralize(
          medication.form,
          scheduledTime.amount
        )} taken at ${scheduledTime.takenTime || timeOfDay}`
      : "Not taken yet";

    schedule.push({
      medicationId: medication.id,
      timeOfDay,
      instruction,
      hasTaken,
      takenTime,
    });
  }

  return schedule;
}

export interface ComputedMedication extends Medication {
  amountPerDay?: number;
  amountRemainingInDays?: number;
  liveDoseSchedule?: LiveDoseScheduleItem[];
  latestRequestStatus: RequestStatus;
  latestRequestStatusChangeTime?: number;
  isOutOfStock?: boolean;
}

function byId(
  state: AppState,
  medicationId: string
): ComputedMedication | undefined {
  const medication = state.medications.medications[medicationId];

  if (!medication) {
    return;
  }

  const request = requestSelectors.requestForMedication(state, medication.id);

  return {
    ...medication,
    amountPerDay: getAmountPerDay(medication),
    amountRemainingInDays: getAmountRemainingInDays(medication),
    liveDoseSchedule: getLiveDoseSchedule(medication),
    latestRequestStatus: request ? request.status : "never_requested",
    latestRequestStatusChangeTime: request
      ? request.lastStatusChange
      : undefined,
    isOutOfStock: Boolean(
      request && request.medicationStockStatus[medication.id] === "out_of_stock"
    ),
  };
}

function byIds(state: AppState, medicationIds: string[]): ComputedMedication[] {
  const res = [];
  for (const medicationId of medicationIds) {
    if (state.medications.medications[medicationId]) {
      const medication = byId(state, medicationId);
      if (medication) {
        res.push(medication);
      }
    }
  }
  return res;
}

function list(state: AppState): ComputedMedication[] {
  const res = [];
  for (const medicationId of Object.keys(state.medications.medications)) {
    if (state.medications.medications[medicationId]) {
      const medication = byId(state, medicationId);
      if (medication) {
        res.push(medication);
      }
    }
  }
  return res;
}

function hasRequestInProgress(state: AppState, medicationId: string) {
  const requestForMedication = requestSelectors.requestForMedication(
    state,
    medicationId
  );
  return Boolean(
    requestForMedication && requestForMedication.status !== "delivered"
  );
}

function hasLowSupply(state: AppState, medicationId: string) {
  const medication = byId(state, medicationId);
  if (
    !medication ||
    (medication.amountRemainingInDays && medication.amountRemainingInDays > 10)
  ) {
    return false;
  }
  return true;
}

function requestableMedication(state: AppState): ComputedMedication[] {
  return list(state).filter(
    (medication) => !hasRequestInProgress(state, medication.id)
  );
}

function nonRequestableMedication(state: AppState): ComputedMedication[] {
  return list(state).filter((medication) =>
    hasRequestInProgress(state, medication.id)
  );
}

function readyToRequestMedication(state: AppState): ComputedMedication[] {
  return requestableMedication(state).filter((medication) =>
    hasLowSupply(state, medication.id)
  );
}

function tooEarlyToRequestMedication(state: AppState): ComputedMedication[] {
  return requestableMedication(state).filter(
    (medication) => !hasLowSupply(state, medication.id)
  );
}

interface FullScheduleItem extends LiveDoseScheduleItem {
  medicationName: string;
}

function todaysFullSchedule(state: AppState): FullScheduleItem[] {
  const medications = list(state);
  const fullSchedule = [];

  for (const medication of medications) {
    if (medication) {
      const medicationName = `${medication.name} ${pluralize(
        medication.form,
        2
      )}`;
      if (medication.liveDoseSchedule) {
        for (const scheduleItem of medication.liveDoseSchedule) {
          fullSchedule.push({ ...scheduleItem, medicationName });
        }
      }
    }
  }

  return fullSchedule.sort((a, b) => (a.timeOfDay > b.timeOfDay ? 1 : -1));
}

export const medicationSelectors = {
  byId,
  byIds,
  list,
  hasRequestInProgress,
  hasLowSupply,
  requestableMedication,
  nonRequestableMedication,
  readyToRequestMedication,
  tooEarlyToRequestMedication,
  todaysFullSchedule,
};
