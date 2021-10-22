import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  changeStateReducer,
  addEmployeeReducer,
  getEmployeeReducer,
} from "./reducers/userReducer";
import {
  addEventReducer,
  getEventReducer,
  updateStatusReducer,
} from "./reducers/eventReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  sidebarShow: changeStateReducer,
  getEvent: getEventReducer,
  updateStatusCheck: updateStatusReducer,
  addEmployee: addEmployeeReducer,
  getEmployee: getEmployeeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  sidebarShow: "responsive",
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
