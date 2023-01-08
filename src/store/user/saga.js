import {call, put, takeEvery} from "redux-saga/effects";
import {checkIfUserDetailsExist, register, signIn} from "../../api/api";
import {checkUserFail, checkUserSuccess, signInFail, signInSuccess} from "./actions";
import {CHECK_USER, REGISTER, SIGN_IN} from "./actionTypes";
import {errorNotification, successNotification} from "../notifications/actions";
import {NotificationBuilder} from "../../components/Notifications/notification";

function* signin({payload}) {
  try {
    const response = yield call(signIn, payload);
    if (response.status === "success") {
      yield put(signInSuccess(response));
      yield put(successNotification(new NotificationBuilder("success", "Logged in successfully")));
    } else {
      yield put(signInFail(response));
      yield put(errorNotification(new NotificationBuilder("error", response)));
    }
  } catch (err) {
    yield put(signInFail(err));
    yield put(errorNotification(new NotificationBuilder("error", err)));
  }
}

function* onRegister({payload}) {
  try {
    const response = yield call(register, payload);
    yield put(signInSuccess(response));
    yield put(successNotification(new NotificationBuilder("success", "Registered successfully")));
  } catch (err) {
    yield put(signInFail(err));
    yield put(errorNotification(new NotificationBuilder("error", err)));
  }
}

function* onCheckUser() {
  try {
    const response = yield call(checkIfUserDetailsExist);
    yield put(checkUserSuccess(response));
  } catch (err) {
    yield put(checkUserFail(err));
    throw err;
  }
}

function* userSaga() {
  yield takeEvery(SIGN_IN, signin);
  yield takeEvery(REGISTER, onRegister);
  yield takeEvery(CHECK_USER, onCheckUser);
}

export default userSaga;