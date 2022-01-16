import { CREATE_LIST_REQUEST, FETCH_LISTS_REQUEST, ListActions, ListState, LISTS_FAILURE, LISTS_SUCCESS } from '../types';

const initialState: ListState = {
  pending: false,
  lists: [],
  error: null,
};

export default function listReducer(state = initialState, action: ListActions) {
  switch (action.type) {
    case FETCH_LISTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case CREATE_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case LISTS_SUCCESS:
      return {
        ...state,
        pending: false,
        lists: action.payload.lists.reverse(),
        error: null,
      };
    case LISTS_FAILURE:
      return {
        ...state,
        pending: false,
        lists: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};