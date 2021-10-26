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
} from "../constants/eventConstants";
import { BASE_URL } from "../constants/urlConstant";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export const addEvent = (event) => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BASE_URL}/api/events/addevent`,
      event,
      config
    );
    if (data) {
      Swal.fire("Event Created", "success");
    }
    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEventList = () => async (dispatch) => {
  try {
    dispatch({
      type: EVENT_DETAILS_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/events/getevents`,
      config
    );

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStatus =
  (newstatus, id, eventEmployee) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_REQUEST,
      });
      console.log(newstatus, id);
      const payload = {
        id,
        newstatus,
        eventEmployee,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/events/updatestatus`,
        payload,
        config
      );

      dispatch({
        type: UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateEvent = (updatedEvent) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_EVENT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${BASE_URL}/api/events/editevent`,
      updatedEvent,
      config
    );
    if (data) {
      Swal.fire("Event Updated", "success");
    }
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
