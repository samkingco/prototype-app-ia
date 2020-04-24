type MedicationForm = "capsule" | "tablet" | "syringe";

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

export const medicationsFakeData: Medication[] = [
  {
    id: "1",
    name: "Omeprazole",
    description: "10mg capsules",
    form: "capsule",
    gpInstructions:
      "Take two capsules in the morning, and two capsules in the evening, on Mondays, Wednesdays, and Fridays",
    amountPrescribed: 56,
    amountRemaining: 12,
    doseScheduleTimes: {
      "08:00": {
        amount: 2,
        taken: false,
      },
      "20:00": {
        amount: 2,
        taken: false,
      },
    },
  },
  {
    id: "2",
    name: "Codeine",
    description: "30mg tablets",
    form: "tablet",
    gpInstructions: "Take one tablet every day",
    amountPrescribed: 28,
    amountRemaining: 6,
    doseScheduleTimes: {
      "16:00": {
        amount: 1,
        taken: false,
      },
    },
  },
  {
    id: "3",
    name: "Insulin",
    description: "Insulin U-100 syringes",
    form: "syringe",
    gpInstructions: "Use one injection in the morning every day",
    amountPrescribed: 14,
    amountRemaining: 12,
    doseScheduleTimes: {
      "08:00": {
        amount: 1,
        taken: false,
      },
    },
  },
  {
    id: "4",
    name: "Ibuprofen",
    description: "400mg tablets",
    form: "tablet",
    gpInstructions: "Take four tablets every day",
    amountPrescribed: 56,
    amountRemaining: 38,
    doseScheduleTimes: {
      "09:00": {
        amount: 2,
        taken: false,
      },
      "16:00": {
        amount: 2,
        taken: false,
      },
    },
  },
  {
    id: "5",
    name: "Folic Acid",
    description: "1mg tablets",
    form: "tablet",
    gpInstructions: "Take one tablet every day",
    amountPrescribed: 84,
    amountRemaining: 70,
    doseScheduleTimes: {
      "08:00": {
        amount: 1,
        taken: false,
      },
    },
  },
  {
    id: "6",
    name: "Aspirin",
    description: "325mg tablets",
    form: "tablet",
    amountPrescribed: 28,
    amountRemaining: 20,
  },
];
