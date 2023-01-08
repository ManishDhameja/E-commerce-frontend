import {call, put, takeEvery} from "redux-saga/effects";
import {ADD_TO_CART} from "./actionTypes";
import {addToCart} from "../../api";
import {addToCartFail, addToCartSuccess} from "./actions";

function* onAddToCart({payload}) {
  try{
    const added = yield call(addToCart, payload)
    if (added) {
      console.log("added");
      yield put(addToCartSuccess())
    }
  } catch (err) {
    console.log(err);
    yield put(addToCartFail(err))
  }
}

function* cartSaga() {
  yield takeEvery(ADD_TO_CART, onAddToCart)
}

export default cartSaga;