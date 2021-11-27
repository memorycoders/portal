
import { put, takeEvery, takeLatest, all, select } from 'redux-saga/effects';
import { listProductWatcher,addProductWatcher,editProductWatcher,deleteProductWatcher } from './form/saga';

export default function* rootSaga () {  
    yield all([
        listProductWatcher(),
        addProductWatcher(),
        editProductWatcher(),
        deleteProductWatcher()
    ])
  }