import productReducer from "./products/reducer";
import {combineReducers} from "redux";
import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import orderHistoryReducer from "./orderHistory/reducer";

const rootReducer = combineReducers({
  products: productReducer,
  user: userReducer,
  cart: cartReducer,
  orderHistory: orderHistoryReducer
});

export default rootReducer;