import React, { useEffect, useState } from "react";
import {
  // CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  // CSelect,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getEmp } from "../../actions/userActions";

const Manageemployee = () => {
  const getEmployee = useSelector((state) => state.getEmployee);
  const { emp } = getEmployee;

  const fields = ["empname", "empdesignation", "Bookings"];
  const bookingfields = ["etype", "client", "eprice", "location", "status"];

  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState([]);
  console.log(booking);
  const dispatch = useDispatch();
  const modalFunction = (item) => {
    setSuccess(!success);
    setBooking(item);
  };
  useEffect(() => {
    dispatch(getEmp());
  }, [dispatch]);
  return (
    <div>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Employee List</CCardHeader>
            <CCardBody>
              <CDataTable
                items={emp}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  Bookings: (item) => (
                    <td>
                      <CButton
                        color="success"
                        onClick={() => modalFunction(item)}
                        className="mr-1"
                      >
                        Check Bookings
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal
          show={success}
          onClose={() => setSuccess(!success)}
          color="success"
        >
          <CModalHeader closeButton>
            <CModalTitle>{booking.empname}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CDataTable
              items={booking.empbooking}
              fields={bookingfields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots={{
                Bookings: (item) => (
                  <td>
                    <CButton
                      color="success"
                      onClick={() => modalFunction(item)}
                      className="mr-1"
                    >
                      Check Bookings
                    </CButton>
                  </td>
                ),
              }}
            />
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
      </CRow>
    </div>
  );
};

export default Manageemployee;
