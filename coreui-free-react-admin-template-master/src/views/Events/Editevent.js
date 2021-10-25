import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CInput,
  CTextarea,
  CCardFooter,
  CInputCheckbox,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSelect,
  CButton,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
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
  "EditEvent",
];

const Editevent = () => {
  const [details, setDetails] = useState([]);
  const [eventData, setEventData] = useState([]);

  const [refreshFunction, setrefreshFunction] = useState(false);
  const [success, setSuccess] = useState(false);
  const [editEvent, setEditEvent] = useState([]);

  const getEvent = useSelector((state) => state.getEvent);
  const { loading, event, error } = getEvent;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateStatusCheck = useSelector((state) => state.updateStatusCheck);
  const { statusUpdate, error: updateError } = updateStatusCheck;
  const modalFunction = (item) => {
    setSuccess(!success);
    setEditEvent(item);
    console.log(item);
  };
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
    if (val) {
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
                    EditEvent: (item) => (
                      <td>
                        <CButton
                          color="success"
                          onClick={() => modalFunction(item)}
                          className="mr-1"
                        >
                          Edit Event
                        </CButton>
                      </td>
                    ),
                  })
                }
              />
            </CCardBody>
          </CCard>
          <CModal
            show={success}
            onClose={() => setSuccess(!success)}
            color="success"
          >
            <CModalHeader closeButton>
              <CModalTitle></CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCard>
                <CCardHeader>
                  Edit Event
                  <small> Details</small>
                </CCardHeader>
                <CCardBody>
                  <CForm
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                  >
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Event Edited By</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <p className="form-control-static">{userInfo.name}</p>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Client Name</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="client"
                          name="client"
                          placeholder="Name"
                          value={editEvent.client}
                          //onChange={(e) => setClient(e.target.value)}
                        />
                        <CFormText>Add Client Name</CFormText>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="email-input">Event Type</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="text"
                          id="etype"
                          name="etype"
                          placeholder="Enter Event name"
                          autoComplete="email"
                          value={editEvent.etype}
                          //onChange={(e) => setEType(e.target.value)}
                        />
                        <CFormText className="help-block">
                          Add Event Name
                        </CFormText>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">Event Date</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="date"
                          id="edate"
                          name="edate"
                          placeholder="date"
                          value={editEvent.edate}
                          //onChange={(e) => setEDate(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Event Price</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="eprice"
                          name="eprice"
                          placeholder="Name"
                          value={editEvent.eprice}
                          //onChange={(e) => setEprice(e.target.value)}
                        />
                        <CFormText>Price</CFormText>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="textarea-input">
                          Event Description
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTextarea
                          name="edesc"
                          id="edesc"
                          rows="9"
                          placeholder="Content..."
                          value={editEvent.edesc}
                          //onChange={(e) => setEDesc(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="textarea-input">Event Location</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CTextarea
                          name="location"
                          id="location"
                          rows="5"
                          placeholder="Event Address..."
                          value={editEvent.location}
                          //onChange={(e) => setLocation(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Album</CLabel>
                      </CCol>
                      <CCol md="9">
                        {editEvent.album && (
                          <CFormGroup row>
                           

                            <CCol xs="12" md="2">
                              <CInput
                                id="text-input"
                                name="sheets"
                                placeholder="sheets"
                                value={editEvent.album.sheets}
                                //onChange={(e) => setSheets(e.target.value)}
                              />
                            </CCol>
                            <CCol xs="12" md="2">
                              <CInput
                                id="text-input"
                                name="quantity"
                                placeholder="quantity"
                                value={editEvent.album.quantity}

                                //onChange={(e) => setQuantity(e.target.value)}
                              />
                            </CCol>
                            <CCol xs="12" md="2">
                              <CInput
                                id="text-input"
                                name="albumPrice"
                                placeholder="album price"
                                value={editEvent.album.albumPrice}

                                //onChange={(e) => setAlbumPrice(e.target.value)}
                              />
                            </CCol>
                          </CFormGroup>
                        )}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="select">Album configurations</CLabel>
                      </CCol>

                      <CCol xs="12" md="2">
                        <CInput
                          id="text-input"
                          name="sheets"
                          placeholder="sheets"
                          //onChange={(e) => setSheets(e.target.value)}
                        />
                      </CCol>
                      <CCol xs="12" md="2">
                        <CInput
                          id="text-input"
                          name="quantity"
                          placeholder="quantity"
                          //onChange={(e) => setQuantity(e.target.value)}
                        />
                      </CCol>
                      <CCol xs="12" md="2">
                        <CInput
                          id="text-input"
                          name="albumPrice"
                          placeholder="album price"
                          //onChange={(e) => setAlbumPrice(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    //onClick={formHandler}
                    size="sm"
                    color="primary"
                  >
                    Submit
                  </CButton>
                  &nbsp;
                  <CButton
                    //onClick={resetHandler}
                    type="reset"
                    size="sm"
                    color="danger"
                  >
                    Reset
                  </CButton>
                </CCardFooter>
              </CCard>
            </CModalBody>
            <CModalFooter>
              <CButton color="success" onClick={() => setSuccess(!success)}>
                Do Something
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setSuccess(!success)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </div>
  );
};

export default Editevent;
