import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects'
import { itemsFailure, itemsSuccess } from '../actions';
import { CREATE_ITEM_REQUEST, DELETE_ITEM_REQUEST, FETCH_ITEMS_REQUEST, ITODOItem, UPDATE_STATUS_ITEM_REQUEST } from '../types';

const fetchItems = (idParrentList: string) => {
  const resultFetchItemsRequest = axios.get("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList/"+ idParrentList +"/TODOItem/");
  return resultFetchItemsRequest;
}

const deleteItem = (item: ITODOItem) => {  
  const resultDeleteItemRequest = axios.delete("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList/"+ item.TODOListId +"/TODOItem/"+item?.id);
  return resultDeleteItemRequest;
}

const createItem = (item: ITODOItem) => {
  const resultCreateItemRequest = axios.post("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList/"+ item.TODOListId +"/TODOItem", item);
  return resultCreateItemRequest;
}

const updateStatusItem = (item: ITODOItem) => {
  const resultCreateItemRequest = axios.put("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList/"+ item.TODOListId +"/TODOItem/" + item.id, item);
  return resultCreateItemRequest;
}

function* fetchItemsSaga(idParrentList : any) {
  try {

    const response: ITODOItem[] = yield call(fetchItems, idParrentList.payload);
    yield put(itemsSuccess({ items: response.data }));

  } catch (e) {
    yield put(itemsFailure({ error: e.message }));
  }
}

function* updateStatusItemSaga(item : any) {
  try {
  
    let response: ITODOItem[] = yield call(updateStatusItem, item.payload);
    
    response = yield call(fetchItems, item.payload.TODOListId);

    yield put(itemsSuccess({ items: response.data }));

  } catch (e) {
    yield put(itemsFailure({ error: e.message }));
  }
}


function* createItemSaga(item : any) {
  try {
  
    let response: ITODOItem[] = yield call(createItem, item.payload);
    
    response = yield call(fetchItems, item.payload.TODOListId);

    yield put(itemsSuccess({ items: response.data }));

  } catch (e) {
    yield put(itemsFailure({ error: e.message }));
  }
}

function* deleteItemSaga(item : any) {
  try {

    let response: ITODOItem[] = yield call(deleteItem, item.payload);
    
    response = yield call(fetchItems, item.payload.TODOListId);

    yield put(itemsSuccess({ items: response.data }));

  } catch (e) {
    yield put(itemsFailure({ error: e.message }));
  }
}

function* watchItemSaga() {
  yield takeLatest(FETCH_ITEMS_REQUEST, fetchItemsSaga);
  yield takeLatest(DELETE_ITEM_REQUEST, deleteItemSaga);
  yield takeLatest(CREATE_ITEM_REQUEST, createItemSaga);
  yield takeLatest(UPDATE_STATUS_ITEM_REQUEST, updateStatusItemSaga);
}

export default watchItemSaga;

