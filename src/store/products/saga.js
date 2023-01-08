import {takeEvery, put, call} from "redux-saga/effects";
import {UPDATE_CURRENT_PRODUCT, UPDATE_NEW_ARRIVALS} from "./actionTypes";
import {fetchProducts, findProductById} from "../../api/api";
import {
  updateCurrentProductFail,
  updateCurrentProductSuccess,
  updateNewArrivalsFail,
  updateNewArrivalsSuccess
} from "./actions";

function* onUpdateCurrentProduct({payload}) {
  try {
    const response = yield call(findProductById, payload);
    yield put(updateCurrentProductSuccess(response));
  } catch (e) {
    yield put(updateCurrentProductFail(e));
    console.log(e);
    throw e;
  }
}

function* onUpdateNewArrivals() {
  try {
    const response = yield call(fetchProducts);
    yield put(updateNewArrivalsSuccess(response));
  } catch (e) {
    yield put(updateNewArrivalsFail(e));
    console.log(e);
    throw e;
  }
}

function* productSaga() {
  yield takeEvery(UPDATE_NEW_ARRIVALS, onUpdateNewArrivals);
  yield takeEvery(UPDATE_CURRENT_PRODUCT, onUpdateCurrentProduct);
}

export default productSaga;