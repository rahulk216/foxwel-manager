import React, { useState } from "react";
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
  CInput,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { addEmp } from "../../actions/userActions";

const Addemployee = () => {
  const [empname, setEmpname] = useState("");
  const [empemail, setEmpemail] = useState("");
  const [empdesignation, setEmpdesignation] = useState("");

  const dispatch = useDispatch();

  // const addEmployee = useSelector((state) => state.addEmployee);
  // const { emp } = addEmployee;
  // console.log(addEmployee);

  const formHandler = () => {
    // const employee = {
    //   empname,
    //   empemail,
    //   empdesignation,
    // };
    dispatch(addEmp(empname, empemail, empdesignation));
  };
  return (
    <div>
      <CCard>
        <CCardHeader>
          Add employee
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post" className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Employee Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  id="empname"
                  name="empname"
                  placeholder="Enter Employee Name..."
                  autoComplete=""
                  onChange={(e) => setEmpname(e.target.value)}
                />
                <CFormText className="help-block">
                  Please enter your email
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-password">Employee Email</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="email"
                  id="empemail"
                  name="empemail"
                  placeholder="Enter Email..."
                  autoComplete=""
                  onChange={(e) => setEmpemail(e.target.value)}
                />
                <CFormText className="help-block">
                  Please enter your email
                </CFormText>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="hf-email">Employee Designation</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput
                  type="text"
                  id="hf-email"
                  name="hf-email"
                  placeholder="Enter Designation..."
                  autoComplete="email"
                  onChange={(e) => setEmpdesignation(e.target.value)}
                />
                <CFormText className="help-block">
                  Please enter your designation
                </CFormText>
              </CCol>
            </CFormGroup>
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={formHandler}
          >
            <CIcon name="cil-scrubber" /> Submit
          </CButton>{" "}
          <CButton type="reset" size="sm" color="danger">
            <CIcon name="cil-ban" /> Reset
          </CButton>
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default Addemployee;
