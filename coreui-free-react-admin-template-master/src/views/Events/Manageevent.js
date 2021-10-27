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
  CCardFooter,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";

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
  { key: "remPrice", label: "Remaining Price" },
  { key: "etype", label: "Event Type" },
  "location",
  { key: "employeeTotalPrice", label: "CTC" },
  "edate",
  "status",
  "profit",
  "EditEmployee",
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
    console.log(newstatus, item);
    dispatch(updateStatus(newstatus, item, event.employee));
    setrefreshFunction(!refreshFunction);
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
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
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
                        {/* <option value="Cancel">Cancel</option> */}
                      </select>
                    </td>
                  ),
                  EditEmployee: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },

                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <CCard>
                            <CCardBody>
                              <CCol md="3">
                                <CLabel htmlFor="select">
                                  Employees Booked for Event
                                </CLabel>
                              </CCol>
                              <CForm>
                                {item.employee.map((emp, i) => {
                                  return (
                                    <CFormGroup row key={i}>
                                      <CCol xs="12" md="2">
                                        <CInput
                                          id="text-input"
                                          name="empname"
                                          placeholder="emp name"
                                          // onChange={(e) =>
                                          //   handleInputChange(e, i)
                                          // }
                                        />
                                      </CCol>
                                      <CCol xs="12" md="2">
                                        <CInput
                                          id="text-input"
                                          name="empdesignation"
                                          placeholder="Designation"
                                          // onChange={(e) =>
                                          //   handleInputChange(e, i)
                                          // }
                                        />
                                      </CCol>
                                      <CCol xs="12" md="2">
                                        <CInput
                                          id="text-input"
                                          name="empprice"
                                          placeholder="Price"
                                          // onChange={(e) =>
                                          //   handleInputChange(e, i)
                                          // }
                                        />
                                      </CCol>
                                      <CCol xs="12" md="2">
                                        {emp.length !== 1 && (
                                          <CButton
                                            color="danger"
                                            //onClick={() => handleRemoveClick(i)}
                                          >
                                            Remove
                                          </CButton>
                                        )}
                                      </CCol>
                                      <CCol>
                                        {emp.length - 1 === i && (
                                          <CButton
                                            color="primary"
                                            //onClick={handleAddClick}
                                          >
                                            Add
                                          </CButton>
                                        )}
                                      </CCol>
                                    </CFormGroup>
                                  );
                                })}
                              </CForm>
                            </CCardBody>
                          </CCard>
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Manageevent;
