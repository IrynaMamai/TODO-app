import { CreateListRequest, CREATE_LIST_REQUEST, ListsFailure, ListsFailurePayload, FetchListsRequest, ListsSuccess, ListsSuccessPayload, FETCH_LISTS_REQUEST, ITODOList, LISTS_FAILURE, LISTS_SUCCESS } from "../types";


export const fetchListsRequest = (): FetchListsRequest => ({
  type: FETCH_LISTS_REQUEST,
});

export const createListRequest = (list : ITODOList): CreateListRequest => ({
  type: CREATE_LIST_REQUEST, 
  payload: list
});

export const listsSuccess = (
  payload: ListsSuccessPayload
): ListsSuccess => ({
  type: LISTS_SUCCESS,
  payload,
});

export const listsFailure = (
  payload: ListsFailurePayload
): ListsFailure => ({
  type: LISTS_FAILURE,
  payload,
});