import { combineReducers } from 'redux';
import itemReducer from './TODOItem.reducer';
import listReducer  from './TODOList.reducer';


export const reducer = combineReducers({
    items: itemReducer,
    lists: listReducer
  });

export type RootState = ReturnType<typeof reducer>;
