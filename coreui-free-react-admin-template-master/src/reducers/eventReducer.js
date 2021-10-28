import {
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_CREATE_RESET,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAIL,
} from "../constants/eventConstants";

export const addEventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getEventReducer = (
  state = { loading: true, event: [] },
  action
) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true };
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateStatusReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return { loading: true };
    case UPDATE_SUCCESS:
      return { loading: true, success: true, statusUpdate: action.payload };
    case UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateEventReducer = (state = { loading: true }, action) => {
  switch (action.payload) {
    case UPDATE_EVENT_REQUEST:
      return { loading: true };
    case UPDATE_EVENT_SUCCESS:
      return { loading: true, success: true, eventUpdate: action.payload };
    case UPDATE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = { loading: true }, action) => {
  switch (action.payload) {
    case EMPLOYEE_DELETE_REQUEST:
      return { loading: true };
    case EMPLOYEE_DELETE_SUCCESS:
      return { loading: true, success: true, deleteEmp: action.payload };
    case EMPLOYEE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addEmployeeToEventReducer = (
  state = { loading: true },
  action
) => {
  switch (action.payload) {
    case ADD_EMPLOYEE_REQUEST:
      return { loading: true };
    case ADD_EMPLOYEE_SUCCESS:
      return { loading: true, success: true, addEmp: action.payload };
    case ADD_EMPLOYEE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
