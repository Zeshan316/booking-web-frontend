import React, { useRef, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModalBody,
  MDBModalFooter,
  MDBTooltip,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import ModalButton from "../Toolbar/ModalButton";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

interface ModalProps {
  show: boolean;
  setShow: () => void;
  handleOnClose: () => void;
  onDelete: (e: any) => void;
  deleteData: any;
}
const DeleteModal: React.FC<ModalProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    console.log("delete data", props?.deleteData);
    props.onDelete(props?.deleteData);
    props.setShow();
  };

  return (
    <ModalButton
      isOpen={props.show}
      setIsOpen={handleOpenModal}
      handleOnClose={props.setShow}
      handleOpenModal={props.setShow}
      iconname={"trash-alt"}
      modalTitle="Delete"
      modalBody={
        <MDBModalBody>
          <MDBCol className="mb-2 mx-1">
            <span className="fs-5 ">
              Are you sure you want to delete this record?
            </span>
          </MDBCol>

          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              className="text-capitalize fw-bold fs-6 "
              onClick={props.setShow}
            >
              No
            </MDBBtn>
            <MDBBtn
              color="info"
              className="text-capitalize fw-bold fs-6 "
              onClick={handleDelete}
            >
              Yes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalBody>
      }
    ></ModalButton>
  );
};

export default DeleteModal;