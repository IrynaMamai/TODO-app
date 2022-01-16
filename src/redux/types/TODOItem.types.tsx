export interface ITODOItem {
    id?: string,
    title: string,
    description?: string,
    deadline?: Date,
    isDone: boolean,
    TODOListId: string
}

export interface ItemState {
    pending: boolean;
    items: ITODOItem[];
    error: string | null;
}


export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST"
export const CREATE_ITEM_REQUEST = "CREATE_ITEM_REQUEST"
export const FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST"
export const UPDATE_STATUS_ITEM_REQUEST = 'UPDATE_STATUS_ITEM_REQUEST'

export interface FetchItemsRequest {
    type: typeof FETCH_ITEMS_REQUEST,
    payload: string
}

export interface DeleteItemRequest {
    type: typeof DELETE_ITEM_REQUEST,
    payload: ITODOItem
}

export interface CreateItemRequest {
    type: typeof CREATE_ITEM_REQUEST,
    payload: ITODOItem
}

export interface UpdateStatusItemRequest {
    type: typeof UPDATE_STATUS_ITEM_REQUEST,
    payload: ITODOItem
}


export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_FAILURE = "ITEMS_FAILURE";

export interface ItemsSuccessPayload {
    items: ITODOItem[];
}

export interface ItemsFailurePayload {
    error: string;
}

export type ItemsSuccess = {
    type: typeof ITEMS_SUCCESS;
    payload: ItemsSuccessPayload;
};

export type ItemsFailure = {
    type: typeof ITEMS_FAILURE;
    payload: ItemsFailurePayload;
};


export type ItemAction =
    | FetchItemsRequest
    | DeleteItemRequest
    | CreateItemRequest
    | UpdateStatusItemRequest
    | ItemsSuccess
    | ItemsFailure;