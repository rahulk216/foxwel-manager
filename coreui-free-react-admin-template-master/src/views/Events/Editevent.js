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
import {
  getEventList,
  updateStatus,
  updateEvent,
} from "../../actions/eventActions";

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
  { key: "etime", label: "Event Time" },
  { key: "employeeTotalPrice", label: "CTC" },
  "profit",
  "remPrice",
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

  /*edit event states*/
  const [eid, seteid] = useState("");
  const [client, setClient] = useState("");
  const [etype, setEType] = useState("");
  const [edate, setEDate] = useState("");
  const [edesc, setEDesc] = useState("");
  const [location, setLocation] = useState("");
  const [eprice, setEprice] = useState("");
  const [sheets, setSheets] = useState("");
  const [quantity, setQuantity] = useState("");
  const [albumPrice, setAlbumPrice] = useState("");
  const [status, setStatus] = useState("");
  const [employeeTotalPrice, setEmployeeTotalPrice] = useState("");
  const [employee, setEmployee] = useState([
    { empname: "", empdesignation: "", empprice: "" },
  ]);
  const [advance, setAdvance] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [advancePayment, setAdvancePayment] = useState([]);
  const [etime, setEtime] = useState("");
  const album = {
    sheets,
    quantity,
    albumPrice,
  };

  const updatedEvent = {
    eid,
    client,
    etype,
    edate,
    etime,
    edesc,
    location,
    eprice,
    album,
    status,
    employee,
    employeeTotalPrice,
    advance,
    payMethod,
  };
  console.log(refreshFunction);
  const updateStatusCheck = useSelector((state) => state.updateStatusCheck);
  const { statusUpdate, error: updateError } = updateStatusCheck;

  const modalFunction = (item) => {
    console.log(item);
    setEmployeeTotalPrice(item.employeeTotalPrice);
    setSuccess(!success);
    setEmployee(item.employee);
    seteid(item._id);
    setEditEvent(item);
    setClient(item.client);
    setEType(item.etype);
    setEDate(item.edate);
    setEmployee(item.employee);
    setEtime(item.etime);
    setEDesc(item.edesc);
    setLocation(item.location);
    setEprice(item.eprice);
    setSheets(item.album.sheets);
    setQuantity(item.album.quantity);
    setAlbumPrice(item.album.albumPrice);
    setStatus(item.status);
    setAdvancePayment(item.advancePayment);
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

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...employee];
    list[index][name] = value;
    setEmployee(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...employee];
    list.splice(index, 1);
    setEmployee(list);
  };

  const handleAddClick = () => {
    setEmployee([
      ...employee,
      { empname: "", empdesignation: "", empprice: "" },
    ]);
  };

  const formUpdateHandler = async () => {
    await dispatch(updateEvent(updatedEvent));
    setrefreshFunction(!refreshFunction);
    setSuccess(!success);
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
                }}
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
                        <CLabel>Event Status</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <p className="form-control-static">{status}</p>
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
                          value={client}
                          onChange={(e) => setClient(e.target.value)}
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
                          value={etype}
                          onChange={(e) => setEType(e.target.value)}
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
                          value={edate}
                          onChange={(e) => setEDate(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">Event Time</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          id="etime"
                          name="etime"
                          placeholder="Time"
                          value={etime}
                          onChange={(e) => setEtime(e.target.value)}
                        />
                        <CFormText>Price</CFormText>
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
                          value={eprice}
                          onChange={(e) => setEprice(e.target.value)}
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
                          value={edesc}
                          onChange={(e) => setEDesc(e.target.value)}
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
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel>Album</CLabel>
                      </CCol>
                      <CCol md="9">
                        {album && (
                          <CFormGroup row>
                            <CCol xs="12" md="4">
                              <CInput
                                id="text-input"
                                name="sheets"
                                placeholder="sheets"
                                value={sheets}
                                onChange={(e) => setSheets(e.target.value)}
                              />
                            </CCol>
                            <CCol xs="12" md="4">
                              <CInput
                                id="text-input"
                                name="quantity"
                                placeholder="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                              />
                            </CCol>
                            <CCol xs="12" md="4">
                              <CInput
                                id="text-input"
                                name="rice"
                                placeholder="album price"
                                value={album.albumPrice}
                                onChange={(e) => setAlbumPrice(e.target.value)}
                              />
                            </CCol>
                          </CFormGroup>
                        )}
                      </CCol>
                    </CFormGroup>

                    {advancePayment &&
                      advancePayment.map((advancePay, i) => (
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="select">Advance Payments</CLabel>
                          </CCol>
                          <CCol xs="12" md="3">
                            <strong>
                              <i class="fas fa-rupee-sign"></i>{" "}
                              {advancePay.price}
                            </strong>
                          </CCol>
                          <CCol xs="12" md="3">
                            <strong>{advancePay.payMethod}</strong>
                          </CCol>
                        </CFormGroup>
                      ))}

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="select">
                          Add new Advance Payment
                        </CLabel>
                      </CCol>

                      <CCol xs="12" md="3">
                        <CInput
                          id="text-input"
                          name="advance"
                          placeholder="Advance Payment"
                          onChange={(e) => setAdvance(e.target.value)}
                        />
                      </CCol>
                      <CCol xs="12" md="3">
                        <CInput
                          id="text-input"
                          name="payMethod"
                          placeholder="Advance Payment Method"
                          onChange={(e) => setPayMethod(e.target.value)}
                        />
                      </CCol>
                    </CFormGroup>
                  </CForm>
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    onClick={formUpdateHandler}
                    size="sm"
                    color="primary"
                  >
                    Submit
                  </CButton>
                  &nbsp;
                </CCardFooter>
              </CCard>
            </CModalBody>
            <CModalFooter>
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
