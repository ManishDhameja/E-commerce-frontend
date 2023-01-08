import {takeEvery, put, call} from "redux-saga/effects";
import {GET_ORDERS, PLACE_ORDER} from "./actionTypes";
import {getOrdersFail, getOrdersSuccess, placeOrderFail,  updateOrderHistory} from "./actions";
// import {fetchOrderHistory, placeOrder} from "../../api";

function* onGetOrders({payload}) {
  try {
    const response = yield call(fetchOrderHistory, payload);
    console.log(response);
    yield put(getOrdersSuccess(response));
  } catch (err) {
    yield put(getOrdersFail(err));
    console.log(err);
  }
}

function* onPlaceOrder({payload}) {
  try {

    const placed = yield call(placeOrder, payload);
    if (placed) yield put(updateOrderHistory(payload.cart));

  } catch (err) {
    yield put(placeOrderFail(err))
    console.log(err);
  }
}

function* orderHistorySaga() {
  yield takeEvery(GET_ORDERS, onGetOrders);
  yield takeEvery(PLACE_ORDER, onPlaceOrder);
}

export default orderHistorySaga;