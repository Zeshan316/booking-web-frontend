import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./RideDetails.css";
import ModalButton from "../Toolbar/ModalButton";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  show: boolean;
  setShow: () => void;
}

const RideDetails: React.FC<ModalProps> = (props) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const ToggleModal = () => {
    setModalShow(!modalShow);
  };

  return (
    <>
      <ModalButton
        isOpen={props.show}
        handleOpenModal={props.setShow}
        modalTitle="Ride Details"
        iconname={"bus"}
        modalBody={
          <MDBModalBody className="mx-3 mt-1">
            {/* create user form */}
            <MDBCol>
              <MDBRow className="mb-4">
                <MDBCol>
                  <h5 className="fw-bold">Passenger Name</h5>
                  <p className="text-style">John Doe</p>
                </MDBCol>

                <MDBCol>
                  <h5 className="fw-bold">Trip Date</h5>
                  <p className="text-style">2021-08-01</p>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol>
                  <h5 className="fw-bold">Shift Time</h5>
                  <p className="text-style">7:00 AM</p>
                </MDBCol>

                <MDBCol>
                  <h5 className="fw-bold">Shuttle Direction </h5>
                  <p className="text-style">North</p>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol>
                  <h5 className="fw-bold">Pickup Location</h5>
                  <p className="text-style">1234 Main St, Anytown, USA</p>
                </MDBCol>

                <MDBCol>
                  <h5 className="fw-bold">Dropoff Location</h5>
                  <p className="text-style">DNA Micro.</p>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol>
                  <h5 className="fw-bold">Status</h5>
                  <p className="text-style">Completed</p>
                </MDBCol>

                <MDBCol>
                  <h5 className="fw-bold">Driver Name</h5>
                  <p className="text-style">John Doe</p>
                </MDBCol>
              </MDBRow>
            </MDBCol>

            <MDBModalFooter>
              <MDBBtn color="info" className=" fw-bold" onClick={props.setShow}>
                OK
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalBody>
        }
      ></ModalButton>
    </>
  );
};

export default RideDetails;
