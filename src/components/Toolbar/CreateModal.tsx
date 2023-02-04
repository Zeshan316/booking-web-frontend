import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import CreateRide from "./CreateRide";
import CreateUser from "./CreateUser";
import ModalButton from "./ModalButton";
import "./CreateRide.css";

export default function CreateModal(): JSX.Element {
  return (
    <MDBRow className="mt-5 px-3 py-2 text-start bg-light d-flex justify-content-start flex-1 ">
      <MDBCol className="">
        <ModalButton
          modalTitle="Create Ride"
          iconname={"bus"}
          modalBody={<CreateRide />}
        >
          Create Ride
        </ModalButton>
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
