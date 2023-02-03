import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import CreateRide from "./CreateRide";
import CreateUser from "./CreateUser";
import ModalButton from "./ModalButton";
import "./CreateRide.css";

export default function CreateModal(): JSX.Element {
  return (
    <MDBRow className="mt-5 px-3 py-2 text-start bg-light ">
      <MDBCol>
        <ModalButton
          modalTitle="Create Ride"
          iconname={"bus"}
          modalBody={<CreateRide />}
        >
          Create Ride
        </ModalButton>
      </MDBCol>
      <MDBCol className="text-start">
        <ModalButton
          modalTitle="Create User"
          iconname={"user-plus"}
          modalBody={<CreateUser />}
        >
          Create User
        </ModalButton>
      </MDBCol>
    </MDBRow>
  );
}
