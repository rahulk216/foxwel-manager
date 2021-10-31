import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  EMPLOYEE_FAIL,
  EMPLOYEE_REQUEST,
  EMPLOYEE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const addEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      return { loading: false, emp: action.payload };
    case ADD_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_REQUEST:
      return { loading: true };
    case EMPLOYEE_SUCCESS:
      return { loading: false, emp: action.payload };
    case EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeStateReducer = (
  state = { sidebarShow: "responsive" },
  { type, ...rest }
) => {
  switch (type) {
    case "set":
      //console.log(state, rest);
      return { ...state, ...rest };
    default:
      return state;
  }
};
