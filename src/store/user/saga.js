import {call, takeEvery, put} from "redux-saga/effects";
// import {signIn, register, checkIfUserDetailsExist} from "../../api";
import {checkUserFail, checkUserSuccess, signInFail, signInSuccess} from "./actions";
import {CHECK_USER, REGISTER, SIGN_IN} from "./actionTypes";

function* signin({payload}) {
  try {
    const response = yield call(signIn, payload);
    yield put(signInSuccess(response));
  } catch (err) {
    yield put(signInFail(err));
    console.log(err);
    throw err;
  }
}

function* onRegister({payload}) {
  try {
    const response = yield call(register, payload);
    yield put(signInSuccess(response));
  } catch (err) {
    yield put(signInFail(err));
    console.log(err);
    throw err;
  }
}

function* onCheckUser() {
  try {
    const response = yield call(checkIfUserDetailsExist);
    yield put(checkUserSuccess(response));
  } catch (err) {
    yield put(checkUserFail(err));
    console.log(err);
    throw err;
  }
}

function* userSaga() {
  yield takeEvery(SIGN_IN, signin);
  yield takeEvery(REGISTER, onRegister);
  yield takeEvery(CHECK_USER, onCheckUser);
}

export default userSaga;