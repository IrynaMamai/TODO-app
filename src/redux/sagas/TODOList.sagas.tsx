import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects'
import { listsFailure, listsSuccess } from '../actions';
import { CREATE_LIST_REQUEST, FETCH_LISTS_REQUEST, ITODOList } from '../types';

 const fetchLists = () => {
  const resultFetchListsRequest = axios.get("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList");
  return resultFetchListsRequest;
}

 const createList = (list: ITODOList) => {
  const resultFetchListsRequest = axios.post("https://61dc4529591c3a0017e1a817.mockapi.io/TODOList", list);
  return resultFetchListsRequest;
}

function* createListSaga(list : any) {
  try {
  
    let response: ITODOList[] = yield call(createList, list.payload);
    
    response = yield call(fetchLists);
    
    yield put(listsSuccess({ lists: response.data }));

  } catch (e) {
    yield put(listsFailure({ error: e.message }));

  }
}



function* fetchListsSaga() {
  try {
    const response: ITODOList[] = yield call(fetchLists);
    yield put(listsSuccess({ lists: response.data }));

  } catch (e) {
    yield put(listsFailure({ error: e.message }));
  }
}

function* watchListSaga() {
  yield takeLatest(FETCH_LISTS_REQUEST, fetchListsSaga);
  yield takeLatest(CREATE_LIST_REQUEST, createListSaga);
}

export default watchListSaga;

