import {ERROR_NOTIFICATION, INFO_NOTIFICATION, SUCCESS_NOTIFICATION} from "./actionTypes";

const INIT_STATE = {
  notifications: [],
};

function notificationReducer(state = INIT_STATE, action) {
  switch (action.type) {

    case SUCCESS_NOTIFICATION:
    case ERROR_NOTIFICATION:
    case INFO_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };

    default: {
      return state;
    }
  }
}

export default notificationReducer;