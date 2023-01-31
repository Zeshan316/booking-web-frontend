import React, { useState } from "react";
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBIcon,
  MDBModalFooter,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
} from "mdb-react-ui-kit";

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
      <MDBBtn onClick={toggleModal}>{children}</MDBBtn>
      <MDBModal show={isOpen} setShow={setIsOpen}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                <MDBIcon
                  size="xl"
                  color="dark"
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
