import React, { useState } from "react";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBIcon,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";
import "./CreateRide.css";

interface Props {
  children?: React.ReactNode;
  modalTitle: string;
  modalBody: React.ReactNode;
  iconname?: string;
  handleOpenModal: () => void;
  isOpen: boolean;
}

const ModalButton: React.FC<Props> = ({
  children,
  modalTitle,
  iconname,
  modalBody,
  handleOpenModal,
  isOpen,
}) => {
  return (
    <>
      {children ? (
        <MDBBtn
          color="info"
          className="button_style me-3"
          onClick={handleOpenModal}
        >
          {children}
        </MDBBtn>
      ) : null}
      <MDBModal show={isOpen}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="fw-bold">
                <MDBIcon
                  size="xl"
                  color="info"
                  className="px-2"
                  fas
                  icon={iconname}
                />
                {modalTitle}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleOpenModal}
              ></MDBBtn>
            </MDBModalHeader>
            {modalBody}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default ModalButton;
