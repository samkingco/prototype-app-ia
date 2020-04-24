import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, GetState } from "..";
import { requestsFakeData, Request, RequestStatus } from "./fake-data";
import { defaultAddress, defaultPaymentMethod } from "../account/fake-data";
import { requestSelectors } from "./selectors";

interface RequestsState {
  requests: {
    [id: string]: Request;
  };
  tempRequest: Request;
}

const tempRequest: Request = {
  id: "temp-request",
  medicationIds: [],
  medicationStockStatus: {},
  status: "not_sent",
  lastStatusChange: Date.now(),
  deliveryAddressId: defaultAddress.id,
  isLetterboxFriendly: true,
  paymentMethodId: defaultPaymentMethod.id,
};

const initialState: RequestsState = {
  requests: requestsFakeData.reduce(
    (state, request) => ({
      ...state,
      [request.id]: request,
    }),
    {}
  ),
  tempRequest,
};

export const { actions, reducer } = createSlice({
  name: "requests",
  initialState,
  reducers: {
    reset: () => initialState,
    sendTempRequest: (state) => {
      const id = `${Math.random().toString(36).substr(2, 9)}`;
      const stockStatuses: Request["medicationStockStatus"] = state.tempRequest.medicationIds.reduce(
        (statuses, id, index) => {
          let status = "in_stock";
          if (index === 1) {
            status = "out_of_stock";
          }
          return {
            ...statuses,
            [id]: status,
          };
        },
        {}
      );
      state.requests[id] = {
        ...state.tempRequest,
        id,
        lastStatusChange: Date.now(),
        medicationStockStatus: stockStatuses,
      };

      // reset the temporary request
      state.tempRequest = tempRequest;
    },
    setSelectedMedicationsForTempRequest: (
      state,
      action: PayloadAction<{ medicationIds: string[] }>
    ) => {
      state.tempRequest.medicationIds = action.payload.medicationIds;
    },
    setSelectedAddressForTempRequest: (
      state,
      action: PayloadAction<{ addressId: string }>
    ) => {
      state.tempRequest.deliveryAddressId = action.payload.addressId;
    },
    setSelectedPaymentMethodForTempRequest: (
      state,
      action: PayloadAction<{ paymentMethodId: string }>
    ) => {
      state.tempRequest.paymentMethodId = action.payload.paymentMethodId;
    },
    updateRequestStatus: (
      state,
      action: PayloadAction<{ requestId: string; status: RequestStatus }>
    ) => {
      state.requests[action.payload.requestId].status = action.payload.status;
    },
    updateRequestBackInStockDate: (
      state,
      action: PayloadAction<{ requestId: string; date: number }>
    ) => {
      state.requests[action.payload.requestId].estimatedBackInStockDate =
        action.payload.date;
    },
    sendAvailableItems: (
      state,
      action: PayloadAction<{
        availableItems: Item[];
      }>
    ) => {
      for (const item of action.payload.availableItems) {
        state.requests[item.originalRequest.id].hasBeenSplit = true;

        const newId = `${Math.random().toString(36).substr(2, 9)}`;
        state.requests[newId] = {
          ...item.originalRequest,
          id: newId,
          medicationIds: [item.medicationId],
          medicationStockStatus: {
            [item.medicationId]: "in_stock",
          },
          estimatedBackInStockDate: undefined,
          status: "preparing",
          lastStatusChange: Date.now(),
        };
      }
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function sendTempRequest() {
  return function (dispatch: Dispatch) {
    dispatch(actions.sendTempRequest());
  };
}

export function updateRequestStatus(requestId: string, status: RequestStatus) {
  return function (dispatch: Dispatch) {
    dispatch(actions.updateRequestStatus({ requestId, status }));
  };
}

export function updateLastRequestStatus(status: RequestStatus) {
  return function (dispatch: Dispatch, getState: GetState) {
    const latestRequest = requestSelectors.latestRequest(getState());
    dispatch(
      actions.updateRequestStatus({ status, requestId: latestRequest.id })
    );
  };
}

export function updateLastRequestBackInStockDate(date: number) {
  return function (dispatch: Dispatch, getState: GetState) {
    const latestRequest = requestSelectors.latestRequest(getState());
    dispatch(
      actions.updateRequestBackInStockDate({
        date,
        requestId: latestRequest.id,
      })
    );
  };
}

interface Item {
  medicationId: string;
  originalRequest: Request;
}

export function sendAvailableItems() {
  return function (dispatch: Dispatch, getState: GetState) {
    const requests = requestSelectors.unpreparedRequests(getState());
    const availableItems: Item[] = [];

    for (const request of requests) {
      for (const medicationId of Object.keys(request.medicationStockStatus)) {
        if (request.medicationStockStatus[medicationId] === "in_stock") {
          availableItems.push({ medicationId, originalRequest: request });
        }
      }
    }

    dispatch(
      actions.sendAvailableItems({
        availableItems,
      })
    );
  };
}

export function setSelectedMedicationsForTempRequest(medicationIds: string[]) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setSelectedMedicationsForTempRequest({ medicationIds }));
  };
}

export function setSelectedAddressForTempRequest(addressId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setSelectedAddressForTempRequest({ addressId }));
  };
}

export function setSelectedPaymentMethodForTempRequest(
  paymentMethodId: string
) {
  return function (dispatch: Dispatch) {
    dispatch(
      actions.setSelectedPaymentMethodForTempRequest({ paymentMethodId })
    );
  };
}
