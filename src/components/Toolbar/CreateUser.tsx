import React, { useState } from "react";
import { MDBBtn, MDBModalBody, MDBModalFooter } from "mdb-react-ui-kit";
import "./CreateRide.css";

export default function CreateUser(): JSX.Element {
  const [userModal, setUserModal] = useState(false);

  return (
    <>
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
        <MDBBtn color="secondary" onClick={() => setUserModal(!userModal)}>
          Close
        </MDBBtn>
        <MDBBtn>Save changes</MDBBtn>
      </MDBModalFooter>
    </>
  );
}
