import { ItemAction, CREATE_ITEM_REQUEST, DELETE_ITEM_REQUEST, ITEMS_FAILURE, ITEMS_SUCCESS, ItemState, FETCH_ITEMS_REQUEST, UPDATE_STATUS_ITEM_REQUEST } from '../types';

const initialState: ItemState = {
  pending: false,
  items: [],
  error: null,
};

export default function itemReducer(state = initialState, action: ItemAction) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST: {
      return {
        ...state,
        pending: true,
      };
    }
    case DELETE_ITEM_REQUEST: {
      return {
        ...state,
        pending: true,
      };
    }
    case CREATE_ITEM_REQUEST: {
      return {
        ...state,
        pending: true,
      };
    }
    case UPDATE_STATUS_ITEM_REQUEST: {
      return {
        ...state,
      };
    }
    case ITEMS_SUCCESS:
      return {
        ...state,
        pending: false,
        items: action.payload.items.reverse(),
        error: null,
      };
    case ITEMS_FAILURE:
      return {
        ...state,
        pending: false,
        items: [],
        error: action.payload.error,
      };
    
    default:
      return state 
  }
};

