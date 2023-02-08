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
  handleOpenModal?: () => void;
  handleOnClose?: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  edit?: boolean;
}

const ModalButton: React.FC<Props> = ({
  children,
  modalTitle,
  iconname,
  modalBody,
  handleOpenModal,
  handleOnClose,
  isOpen,
  setIsOpen,
  edit,
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

      <MDBModal show={isOpen} setShow={setIsOpen} onHide={handleOnClose}>
        <MDBModalDialog>
          <MDBModalContent className={`bg-light`}>
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
                onClick={handleOnClose}
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
