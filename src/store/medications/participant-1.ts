import { Medication } from "./fake-data";

export const p1Medications: Medication[] = [
  {
    id: "1",
    name: "Sertraline",
    description: "100mg tablets",
    form: "tablet",
    gpInstructions: "One To Be Taken Each Day",
    amountPrescribed: 28,
    amountRemaining: 12,
    doseScheduleTimes: {
      "08:00": {
        amount: 1,
        taken: false,
      },
    },
  },
  {
    id: "2",
    name: "Desogestrel",
    description: "75microgram tablets",
    form: "tablet",
    gpInstructions: "One Tablet Daily At The Same Time Each Day",
    amountPrescribed: 84,
    amountRemaining: 52,
    doseScheduleTimes: {
      "16:00": {
        amount: 1,
        taken: false,
      },
    },
  },
  {
    id: "3",
    name: "Fluoxetine",
    description: "20mg capsules",
    form: "capsule",
    gpInstructions: "Two To Be Taken Each Day",
    amountPrescribed: 28,
    amountRemaining: 2,
    doseScheduleTimes: {
      "20:00": {
        amount: 2,
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
