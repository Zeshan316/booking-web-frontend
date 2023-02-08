import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import dayjs from "dayjs";
import "./UserDetails.css";
import ModalButton from "../Toolbar/ModalButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ModalProps {
  show: boolean;
  setShow: () => void;
}

function UserDetails({ show, setShow }: ModalProps): JSX.Element {
  const userDetail = useSelector((state: RootState) => state.user.user);
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = () => {
    setModalShow(!modalShow);
  };
  return (
    <ModalButton
      isOpen={show}
      setIsOpen={toggleModal}
      handleOpenModal={setShow}
      modalTitle="User Detail"
      iconname={"bus"}
      handleOnClose={setShow}
      modalBody={
        <MDBModalBody className="me-1 mx-0 mt-1 w-100">
          <MDBCol className="">
            <MDBRow className="mb-4">
              <MDBCol>
                <h5 className="fw-bold">First Name</h5>
                <p className="text-style">{userDetail.firstName}</p>
              </MDBCol>

              <MDBCol>
                <h5 className="fw-bold">Last Name</h5>
                <p className="text-style">{userDetail.lastName || "N/A"}</p>
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol
                className="col-6
			  "
              >
                <h5 className="fw-bold">Email</h5>
                <p className="text-style">{userDetail.email}</p>
              </MDBCol>

              <MDBCol className="col-6">
                <h5 className="fw-bold">Creation Date</h5>
                <p className="text-style">
                  {dayjs(userDetail.createdAt).format("YYYY-MM-DD") || "N/A"}
                </p>
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-4">
              <MDBCol>
                <h5 className="fw-bold">Role</h5>
                <p className="text-style">{userDetail?.role?.name}</p>
              </MDBCol>
              <MDBCol>
                <h5 className="fw-bold">Status</h5>
                <p className="text-style">
                  {userDetail?.isActive ? (
                    <MDBBadge light color="success" pill className="status">
                      Active
                    </MDBBadge>
                  ) : (
                    <MDBBadge light color="warning" pill className="status">
                      In-Active
                    </MDBBadge>
                  )}
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-4">
              <MDBCol>
                <h5 className="fw-bold">Phone #</h5>
                <p className="text-style">{userDetail?.phoneNumber}</p>
              </MDBCol>
              <MDBCol>
                {userDetail?.deletedAt && (
                  <>
                    <h5 className="fw-bold">Deleted</h5>
                    <p className="text-style">
                      {dayjs(userDetail?.deletedAt).format("YYYY-MM-DD")}
                    </p>
                  </>
                )}
              </MDBCol>
            </MDBRow>
          </MDBCol>

          <MDBModalFooter>
            <MDBBtn color="info" className="fw-bold" onClick={setShow}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalBody>
      }
    ></ModalButton>
  );
}

export default UserDetails;
