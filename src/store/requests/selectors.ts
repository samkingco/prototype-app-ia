import { AppState } from "..";
import { Request } from "./fake-data";

export interface ComputedRequest extends Request {}

function byId(
  state: AppState,
  requestId?: string
): ComputedRequest | undefined {
  if (!requestId) return;
  const request = state.requests.requests[requestId];
  if (!request) return;
  return request;
}

function list(state: AppState): ComputedRequest[] {
  const res = [];
  for (const requestId of Object.keys(state.requests.requests)) {
    if (state.requests.requests[requestId]) {
      const request = byId(state, requestId);
      if (request) {
        res.push(request);
      }
    }
  }
  return res;
}

function latestRequest(state: AppState) {
  return list(state).sort((a, b) =>
    a.lastStatusChange > b.lastStatusChange ? -1 : 1
  )[0];
}

function requestForMedication(
  state: AppState,
  medicationId: string
): ComputedRequest | undefined {
  const requests = list(state);
  const foundRequests = requests.filter((r) =>
    r.medicationIds.includes(medicationId)
  );
  const latestRequest = foundRequests.sort((a, b) =>
    a.lastStatusChange > b.lastStatusChange ? -1 : 1
  )[0];

  if (!latestRequest) {
    return;
  }
  return latestRequest;
}

function unpreparedRequests(state: AppState): ComputedRequest[] {
  const unpreparedStatuses = [
    "not_sent",
    "awaiting_rx",
    "awaiting_payment",
    "awaiting_stock",
  ];
  return list(state).filter((i) => unpreparedStatuses.includes(i.status));
}

function getTempRequest(state: AppState): Request {
  return state.requests.tempRequest;
}

export const requestSelectors = {
  list,
  byId,
  requestForMedication,
  getTempRequest,
  latestRequest,
  unpreparedRequests,
};
