import { ITODOItem } from "./TODOItem.types";

export interface ITODOList {
    id?: string,
    nameList: string,
    TODOItems?: ITODOItem[],
}

export interface ListState {
    pending: boolean;
    lists: ITODOList[];
    error: string | null;
}


export const FETCH_LISTS_REQUEST = "FETCH_LISTS_REQUEST";
export const CREATE_LIST_REQUEST = "CREATE_LIST_REQUEST";

export interface FetchListsRequest {
    type: typeof FETCH_LISTS_REQUEST;
}

export type CreateListRequest =  {
    type: typeof CREATE_LIST_REQUEST;
    payload: ITODOList
}



export const LISTS_SUCCESS = "LISTS_SUCCESS";
export const LISTS_FAILURE = "LISTS_FAILURE";

export interface ListsSuccessPayload {
    lists: ITODOList[];
}

export interface ListsFailurePayload {
    error: string;
}

export type ListsSuccess = {
    type: typeof LISTS_SUCCESS;
    payload: ListsSuccessPayload;
};

export type ListsFailure = {
    type: typeof LISTS_FAILURE;
    payload: ListsFailurePayload;
};



export type ListActions =
    | FetchListsRequest
    | CreateListRequest
    | ListsSuccess
    | ListsFailure;