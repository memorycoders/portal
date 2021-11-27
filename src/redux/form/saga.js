import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { PRODUCT_SAGA_TYPES } from "src/constants";
import {
  LIST_PRODUCT_ADD,
  LIST_PRODUCT_EDIT,
  LIST_PRODUCT_DEL,
} from "src/constants";
import {
  apiListProduct,
  apiCreateProduct,
  apiEditProduct,
  apiDelProduct,
} from "src/apis";

function* ListProductFlow(action) {
  try {
    const res = yield call(apiListProduct);
    yield put({ type: PRODUCT_SAGA_TYPES.LIST_PRODUCT_SUCCESS, res });
  } catch (err) {
    console.log(err);
    yield put({ type: PRODUCT_SAGA_TYPES.LIST_PRODUCT_ERROR });
  }
}

function* AddProductFlow(action) {
  try {
    const res = yield call(apiCreateProduct, action.item);
    yield put({ type: PRODUCT_SAGA_TYPES.CREATE_PRODUCT_SUCCESS, res });
  } catch {
    yield put({ type: PRODUCT_SAGA_TYPES.CREATE_PRODUCT_ERROR });
  }
}

function* EditProductFlow(action) {
  try {
    const res = yield call(apiEditProduct, action.item);
    const editItem = action.item;
    yield put({ type: PRODUCT_SAGA_TYPES.EDIT_PRODUCT_SUCCESS, editItem });
  } catch {
    yield put({ type: PRODUCT_SAGA_TYPES.EDIT_PRODUCT_ERROR });
  }
}

function* DeleteProductFlow(action) {
  try {
    const res = yield call(apiDelProduct,action.index);
    yield put({ type: PRODUCT_SAGA_TYPES.DELETE_PRODUCT_SUCCESS, res });
  } catch {
    yield put({ type: PRODUCT_SAGA_TYPES.DELETE_PRODUCT_ERROR });
  }
}

export function* addProductWatcher() {
  yield takeEvery(LIST_PRODUCT_ADD, AddProductFlow);
}

export function* listProductWatcher() {
  yield takeEvery(PRODUCT_SAGA_TYPES.LIST_PRODUCT_REQUEST, ListProductFlow);
}

export function* editProductWatcher() {
  yield takeEvery(LIST_PRODUCT_EDIT, EditProductFlow);
}

export function* deleteProductWatcher(){
  yield takeEvery(LIST_PRODUCT_DEL,DeleteProductFlow)
}