import {
    CHECK_USER,
    CHECK_USER_FAIL,
    CHECK_USER_SUCCESS,
    LOGOUT,
    REGISTER,
    SIGN_IN,
    SIGN_IN_SUCCESS
  } from "./actionTypes";
  
  export const signIn = payload => ({
    type: SIGN_IN,
    payload,
  });
  
  export const signInSuccess = userDetails => ({
    type: SIGN_IN_SUCCESS,
    payload: userDetails,
  });
  
  export const signInFail = err => ({
    type: SIGN_IN_SUCCESS,
    payload: err,
  });
  
  export const register = payload => ({
    type: REGISTER,
    payload,
  });
  
  export const checkUser = () => ({
    type: CHECK_USER,
  })
  
  export const checkUserSuccess = userDetails =>  ({
    type: CHECK_USER_SUCCESS,
    payload: userDetails
  })
  
  export const checkUserFail = err =>  ({
    type: CHECK_USER_FAIL,
    payload: err
  })
  
  export const logOut = () => ({
    type: LOGOUT
  })