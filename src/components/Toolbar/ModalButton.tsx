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
  children: React.ReactNode;
  modalTitle: string;
  modalBody: React.ReactNode;
  iconname?: string;
}

const ModalButton: React.FC<Props> = ({
  children,
  modalTitle,
  iconname,
  modalBody,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MDBBtn color="info" className="button_style" onClick={toggleModal}>
        {children}
      </MDBBtn>
      <MDBModal show={isOpen} setShow={setIsOpen}>
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
                onClick={toggleModal}
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
