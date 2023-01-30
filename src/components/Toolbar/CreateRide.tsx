import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./CreateRide.css";

export default function CreateRide(): JSX.Element {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const NorthPoints = [
    "MARIGONDON CROSSING",
    "GAISANO GRAND MALL, BASAK, LAPULAPU",
    "SAN NARCISO CHURCH, CONSOLACION",
    "M.LHUILLEIR, GUIZO, PANAGDAIT HERNAN CORTES",
    "TALAMBAN",
    "CAMP LAPULAPU ROAD, APAS",
    "UCMA",
    "DNA MICRO",
  ];

  const SouthPoints = [
    "JOLLIBEE BANAWA JUNCTION, MAMA SUSAN'S, V.RAMA (GUADALUPE & V RAMA COMPUTERS",
    "CALAMBA FLYOVER, V. RAMA",
    "DECA HOMES, TISA ARBEES, TISA",
    "GAISANO, TISA",
    "JOLLIBEE, PUNTA PRINCESA, F. LLAMAS",
    "WAITING SHED, SUBA, PASIL",
    "T.PADILLA BGY HALL",
    "BASELINE, JUANA OSMENA",
    "DNA MICRO",
  ];

  return (
    <>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light align-items-end">
        <MDBCol>
          <MDBBtn color="primary" onClick={toggleShow}>
            CREATE RIDE
          </MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon
                  size="xl"
                  color="dark"
                  className="px-2"
                  fas
                  icon="bus"
                />
                Create Ride
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="mx-4">
              {/* create user form */}
              <form>
                <div className="form-group">
                  <label className="fw-bold py-1">Trip Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control mb-2"
                    placeholder="Enter Date"
                  />

                  <label className="fw-bold py-1">Shift Time </label>
                  <input
                    className="form-control"
                    type="time"
                    id="appt"
                    name="appt"
                    min="09:00"
                    max="24:00"
                    required
                  ></input>

                  <label className="fw-bold py-1"> Shuttle Type</label>
                  <select className="selectbox mb-2" placeholder="Choose">
                    <option disabled selected hidden>
                      Choose
                    </option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                  </select>

                  <label className="fw-bold py-1"> Pick-up point</label>
                  <select className="selectbox mb-2" placeholder="Choose">
                    <option disabled selected hidden>
                      Choose
                    </option>
                    <option value="1">North</option>
                    <option value="2">South</option>
                  </select>

                  <label className="fw-bold py-1"> Destination</label>
                  <select className="selectbox mb-2">
                    <option disabled selected hidden>
                      Choose
                    </option>
                    <option value="1">North</option>
                    <option value="2">South</option>
                  </select>
                </div>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
