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
  CButton,
  CCollapse,
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
  { key: "client", label: "Client Name" },
  { key: "eprice", label: "Quoted Price" },
  { key: "etype", label: "Event Type" },
  "location",
  { key: "employeeTotalPrice", label: "CTC" },
  "edate",
  "status",
  "UpdateStatus",
];

const Manageevent = () => {
  const [details, setDetails] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [refreshFunction, setrefreshFunction] = useState(false);

  const getEvent = useSelector((state) => state.getEvent);
  const { loading, event, error } = getEvent;

  const updateStatusCheck = useSelector((state) => state.updateStatusCheck);
  const { statusUpdate, error: updateError } = updateStatusCheck;

  const dispatch = useDispatch();

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  useEffect(() => {
    dispatch(getEventList());
  }, [dispatch, refreshFunction]);

  const update = (item, newstatus, event) => {
    const val = Window.confirm("Change status confirmation");
    if(val)
   {
      console.log(newstatus, item);
    dispatch(updateStatus(newstatus, item, event.employee));
    setrefreshFunction(!refreshFunction);
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
                          onChange={(e) =>
                            update(item._id, e.target.value, item)
                          }
                        >
                          <option value="0">Please select</option>
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          {/* <option value="Cancel">Cancel</option> */}
                        </select>
                      </td>
                    ),
                  }
                  )
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
