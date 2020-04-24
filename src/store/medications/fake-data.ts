import { p1Medications } from "./participant-1";

type MedicationForm = "capsule" | "tablet" | "syringe" | "drop" | "inhaler";

export interface DoseScheduleTime {
  amount: number;
  taken: boolean;
  takenTime?: string;
}

export interface Medication {
  id: string;
  name: string;
  description: string;
  form: MedicationForm;
  gpInstructions?: string;
  amountPrescribed: number;
  amountRemaining: number;
  doseScheduleTimes?: {
    [timeOfDay: string]: DoseScheduleTime;
  };
}

export const medicationsFakeData = p1Medications;
