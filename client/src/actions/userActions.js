import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  ADD_EMPLOYEE_FAIL,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  EMPLOYEE_FAIL,
  EMPLOYEE_REQUEST,
  EMPLOYEE_SUCCESS,
} from "../constants/userConstants";
import { BASE_URL } from "../constants/urlConstant";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/users/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const getEmp =() => async (dispatch) => {
    try {
      
      dispatch({ type: EMPLOYEE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     
      const { data } = await axios.get(
        `${BASE_URL}/api/users/getemp`,
        config
      );

      dispatch({
        type: EMPLOYEE_SUCCESS,
        payload: data,
      });
      
    } catch (error) {
      dispatch({
        type: EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const addEmp =
  (empname, empemail, empdesignation) => async (dispatch) => {
    try {
      const emp = {
        empname,
        empemail,
        empdesignation,
      };
      dispatch({ type: ADD_EMPLOYEE_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(emp);
      const { data } = await axios.post(
        `${BASE_URL}/api/users/addemp`,
        emp,
        config
      );

      console.log(data);

      dispatch({
        type: ADD_EMPLOYEE_SUCCESS,
        payload: data,
      });
      if (data) {
        Swal.fire("Employee added", "success");
      }
    } catch (error) {
      dispatch({
        type: ADD_EMPLOYEE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
