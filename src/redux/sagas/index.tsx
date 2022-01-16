import { all } from "redux-saga/effects";
import watchItemSaga from "./TODOItem.sagas";
import watchListSaga from "./TODOList.sagas";

export default function* rootSaga() {
    yield all([
      watchListSaga(),
      watchItemSaga()
    ])
  }