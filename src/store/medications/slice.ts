import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { Dispatch } from "..";
import { medicationsFakeData, Medication } from "./fake-data";

interface MedicationState {
  medications: {
    [id: string]: Medication;
  };
}

const initialState: MedicationState = {
  medications: medicationsFakeData.reduce(
    (state, med) => ({
      ...state,
      [med.id]: med,
    }),
    {}
  ),
};

export const { actions, reducer } = createSlice({
  name: "medications",
  initialState,
  reducers: {
    reset: () => initialState,
    takeDose: (
      state,
      action: PayloadAction<{ medicationId: string; timeOfDay: string }>
    ) => {
      const medication = state.medications[action.payload.medicationId];
      const doseScheduleTimes = medication.doseScheduleTimes;

      if (
        !doseScheduleTimes ||
        doseScheduleTimes[action.payload.timeOfDay].taken
      ) {
        return;
      }

      medication.amountRemaining =
        medication.amountRemaining -
        doseScheduleTimes[action.payload.timeOfDay].amount;

      doseScheduleTimes[action.payload.timeOfDay] = {
        ...doseScheduleTimes[action.payload.timeOfDay],
        taken: true,
        takenTime: format(Date.now(), "h:mma").toLowerCase(),
      };
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function takeDose(medicationId: string, timeOfDay: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.takeDose({ medicationId, timeOfDay }));
  };
}
