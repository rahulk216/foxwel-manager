import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSelect,
} from "@coreui/react";
import usersData from "../users/UsersData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getEventList, updateStatus } from "../../actions/eventActions";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const fields = [
  "client",
  "eprice",
  "etype",
  "eprice",
  "location",
  "employeeTotalPrice",
  "createdDate",
  "status",
  "UpdateStatus",
];

const Manageevent = () => {
  const [eventData, setEventData] = useState([]);

  const getEvent = useSelector((state) => state.getEvent);
  const { loading, event, error } = getEvent;

  const updateStatusCheck = useSelector((state) => state.updateStatusCheck);
  const { statusUpdate, error: updateError } = updateStatusCheck;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch]);

  const update = (item, newstatus, event) => {
    console.log(newstatus, item);
    dispatch(updateStatus(newstatus, item, event));
    if (statusUpdate) {
      dispatch(getEventList());
    }
  };
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Event List</CCardHeader>
            <CCardBody>
              <CDataTable
                items={event}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={
                  ({
                    status: (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  },
                  {
                    UpdateStatus: (item) => (
                      <td>
                        <select
                          custom
                          name="empname"
                          id="select"
                          onChange={(e) => update(item._id, e.target.value, item)}
                        >
                          <option value="0">Please select</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    ),
                  })
                }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Manageevent;
