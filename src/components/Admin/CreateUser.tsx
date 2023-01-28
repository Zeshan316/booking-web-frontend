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
  MDBCol
} from "mdb-react-ui-kit";

export default function CreateUser(): JSX.Element {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light align-items-end">
              <MDBCol>
                <MDBBtn color="primary"  onClick={toggleShow} >
                  CREATE
                </MDBBtn>
              </MDBCol>
            </MDBRow>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create User</MDBModalTitle>
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
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-2"
                    placeholder="Enter Last Name"
                  />

                  <label>First Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-2"
                    placeholder="Enter First Name"
                  />

                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Enter email"
                  />
                  <label> Role</label>
                  <select className="form-control mb-2" >
                    <option value="User">User</option>
                    <option value="App Admin">App Admin</option>
                    <option value="System Admin">System Admin</option>
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
