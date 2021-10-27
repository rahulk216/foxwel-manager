import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../actions/eventActions";

import { getEmp } from "../../actions/userActions";

const Addevent = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getEmployee = useSelector((state) => state.getEmployee);
  const { loading, emp, error } = getEmployee;

  const [openAlbum, setOpenAlbum] = useState(false);

  const dispatch = useDispatch();
  const [employee, setEmployee] = useState([
    { empname: "", empdesignation: "", empprice: "" },
  ]);

  const [client, setClient] = useState("");
  const [eType, setEType] = useState("");
  const [eDate, setEDate] = useState("");
  const [eDesc, setEDesc] = useState("");
  const [location, setLocation] = useState("");
  const [eprice, setEprice] = useState("");
  const [etime, setEtime] = useState("");
  const [sheets, setSheets] = useState("");
  const [quantity, setQuantity] = useState("");
  const [albumPrice, setAlbumPrice] = useState("");
  const [advance, setAdvance] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const album = {
    sheets,
    quantity,
    albumPrice,
  };
  useEffect(() => {
    dispatch(getEmp());
  }, []);

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

  const formHandler = async () => {
    console.log("hello");
    const event = {
      client,
      etype: eType,
      edate: eDate,
      edesc: eDesc,
      location,
      eprice,
      employee,
      album,
      advance,
      payMethod,
    };
    console.log(event);
    dispatch(addEvent(event));
  };
  const resetHandler = () => {
    setClient("");
    setEType("");
    setEDate("");
    setEDesc("");
    setLocation("");
    setEprice("");
  };
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Add Event
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
                    <CLabel>Event Created By</CLabel>
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
                      onChange={(e) => setEType(e.target.value)}
                    />
                    <CFormText className="help-block">Add Event Name</CFormText>
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
                      onChange={(e) => setEDate(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Event Time</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="text"
                      id="etime"
                      name="etime"
                      placeholder="date"
                      onChange={(e) => setEtime(e.target.value)}
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
                      onChange={(e) => setEprice(e.target.value)}
                    />
                    <CFormText>Price</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Event Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="edesc"
                      id="edesc"
                      rows="9"
                      placeholder="Content..."
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
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Album</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox
                        custom
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                        onChange={() => setOpenAlbum(!openAlbum)}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor="inline-checkbox1"
                      ></CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                {openAlbum && (
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Album configurations</CLabel>
                    </CCol>

                    <CCol xs="12" md="2">
                      <CInput
                        id="text-input"
                        name="sheets"
                        placeholder="sheets"
                        onChange={(e) => setSheets(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="2">
                      <CInput
                        id="text-input"
                        name="quantity"
                        placeholder="quantity"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </CCol>
                    <CCol xs="12" md="2">
                      <CInput
                        id="text-input"
                        name="albumPrice"
                        placeholder="album price"
                        onChange={(e) => setAlbumPrice(e.target.value)}
                      />
                    </CCol>
                  </CFormGroup>
                )}

                {employee.map((x, i) => {
                  return (
                    <CFormGroup row key={i}>
                      <CCol md="3">
                        <CLabel htmlFor="select">
                          Employees Booked for Event
                        </CLabel>
                      </CCol>

                      <CCol xs="12" md="2">
                        <CSelect
                          custom
                          name="empname"
                          onChange={(e) => handleInputChange(e, i)}
                          id="select"
                        >
                          <option value="0">Please select</option>
                          {emp &&
                            emp.map((employee) => (
                              <option value={employee.empname}>
                                {employee.empname}
                              </option>
                            ))}
                        </CSelect>
                      </CCol>
                      <CCol xs="12" md="2">
                        <CInput
                          id="text-input"
                          name="empdesignation"
                          placeholder="Designation"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </CCol>
                      <CCol xs="12" md="2">
                        <CInput
                          id="text-input"
                          name="empprice"
                          placeholder="Price"
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </CCol>

                      <CCol xs="12" md="2">
                        {employee.length !== 1 && (
                          <CButton
                            color="danger"
                            onClick={() => handleRemoveClick(i)}
                          >
                            Remove
                          </CButton>
                        )}
                      </CCol>
                      <CCol>
                        {employee.length - 1 === i && (
                          <CButton color="primary" onClick={handleAddClick}>
                            Add
                          </CButton>
                        )}
                      </CCol>
                    </CFormGroup>
                  );
                })}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Advance Payment</CLabel>
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
                onClick={formHandler}
                size="sm"
                color="primary"
              >
                Submit
              </CButton>
              &nbsp;
              <CButton
                onClick={resetHandler}
                type="reset"
                size="sm"
                color="danger"
              >
                Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Addevent;
