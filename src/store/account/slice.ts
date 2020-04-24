import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "..";
import { accountFakeData, Account, Patient } from "./fake-data";

const initialState: Account = accountFakeData;

export const { actions, reducer } = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset: () => initialState,
    setupPatient: (state, action: PayloadAction<Partial<Patient>>) => {
      state.name = `${action.payload.firstName} ${action.payload.lastName}`;
      state.emailAddress = `${action.payload.firstName?.toLowerCase()}.${action.payload.lastName?.toLowerCase()}@gmail.com`;
      state.patients[0] = {
        ...state.patients[0],
        ...action.payload,
      };
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function setupPatient(patient: Partial<Patient>) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setupPatient(patient));
  };
}
