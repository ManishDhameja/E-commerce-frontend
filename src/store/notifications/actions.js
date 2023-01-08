import {
    ERROR_NOTIFICATION, INFO_NOTIFICATION,
    SUCCESS_NOTIFICATION
  } from "./actionTypes";
  
  export const successNotification = notification => ({
    type: SUCCESS_NOTIFICATION,
    payload: notification
  });
  
  export const errorNotification = notification => ({
    type: ERROR_NOTIFICATION,
    payload: notification
  });
  
  export const infoNotification = notification => ({
    type: INFO_NOTIFICATION,
    payload: notification
  });