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
import CreateRide from "./CreateRide";
import "./CreateRide.css";

export default function CreateUser(): JSX.Element {
  const [userModal, setUserModal] = useState(false);
  const [rideModal, setrideModal] = useState(false);

  // function handleUserModel(): void{
  //   se
  // }

  // const toggleShow = () => setBasicModal(!basicModal);

  //install  prettier in vs c

  return (
    <>
      <MDBRow className="mt-5 px-3 py-2 text-start bg-light">
        <MDBBtn
          color="primary"
          className="m-2"
          onClick={() => setUserModal(!userModal)}
        >
          CREATE USER
        </MDBBtn>
        <MDBBtn
          color="primary"
          outline
          className="m-2"
          onClick={() => setUserModal(!rideModal)}
        >
          CREATE RIDE
        </MDBBtn>
      </MDBRow>
      {userModal && (
        <MDBModal show={userModal} setShow={setUserModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>
                  <MDBIcon fas icon="user-plus" className="px-2" />
                  Create User
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => setUserModal(!userModal)}
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

                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Set password"
                    />

                    <label htmlFor="exampleInputEmail1">Retype Password</label>
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Retype password"
                    />

                    <label> Role</label>
                    <select className="form-control mb-2">
                      <option value="User">User</option>
                      <option value="App Admin">App Admin</option>
                      <option value="System Admin">System Admin</option>
                    </select>
                  </div>
                </form>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  onClick={() => setUserModal(!userModal)}
                >
                  Close
                </MDBBtn>
                <MDBBtn>Save changes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}

      {rideModal && <CreateRide />}
    </>
  );
}
