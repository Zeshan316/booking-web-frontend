import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBBtn,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "./RideDetails.css";
import img from "../../assets/car-detail-bg.png";
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
      <MDBModal
        show={props.show}
        // setShow={props.setShow}
        tabIndex="-1"
        className="modal-dialog-centered"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="fw-bold mt-1 fs-4">
                <MDBIcon
                  size="xl"
                  color="info"
                  className="px-2"
                  fas
                  icon={"bus"}
                />
                Ride Details
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={props.setShow}
              ></MDBBtn>
            </MDBModalHeader>

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
                <MDBBtn
                  color="info"
                  className=" fw-bold"
                  onClick={props.setShow}
                >
                  OK
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default RideDetails;
