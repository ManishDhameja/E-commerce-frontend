import {all, fork} from 'redux-saga/effects';
import productSaga from "./products/saga";
import userSaga from "./user/saga";
import cartSaga from "./cart/saga";
import orderHistorySaga from "./orderHistory/saga";

function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(userSaga),
    fork(cartSaga),
    fork(orderHistorySaga)
  ]);
}

export default rootSaga;