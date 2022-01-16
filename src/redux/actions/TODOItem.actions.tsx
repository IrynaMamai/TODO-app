import { CREATE_ITEM_REQUEST, DELETE_ITEM_REQUEST, ItemsFailure, ItemsFailurePayload, ItemsSuccess, ItemsSuccessPayload, ITEMS_FAILURE, ITEMS_SUCCESS, ITODOItem, CreateItemRequest, DeleteItemRequest, FETCH_ITEMS_REQUEST, FetchItemsRequest, UPDATE_STATUS_ITEM_REQUEST, UpdateStatusItemRequest } from "../types";

export const fetchItemsRequest = (idParrentList: string): FetchItemsRequest => ({
    type: FETCH_ITEMS_REQUEST,
    payload: idParrentList
  });
  

export const deleteItemRequest = (item: ITODOItem): DeleteItemRequest => ({
    type: DELETE_ITEM_REQUEST,
    payload: item
});

export const createItemRequest = (item: ITODOItem): CreateItemRequest => ({
    type: CREATE_ITEM_REQUEST,
    payload: item
});

export const updateStatusItemRequest = (item: ITODOItem): UpdateStatusItemRequest => ({
    type: UPDATE_STATUS_ITEM_REQUEST,
    payload: item
});


export const itemsSuccess = (
    payload: ItemsSuccessPayload
): ItemsSuccess => ({
    type: ITEMS_SUCCESS,
    payload,
});

export const itemsFailure = (
    payload: ItemsFailurePayload
): ItemsFailure => ({
    type: ITEMS_FAILURE,
    payload,
});