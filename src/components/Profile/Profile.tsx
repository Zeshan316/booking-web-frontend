import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone_no: "123-456-7890",
    profile_image_url: "https://via.placeholder.com/150",
  });

  const handleChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MDBContainer className="mt-5 w-50">
      <MDBCard className="card">
        <MDBCardBody className="card-body p-4 p-md-5">
          <h3 className="fw-bold mb-4 pb-2">Profile Details</h3>
          <img
            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
            alt=""
            className="rounded-circle align img-fluid w-25 mx-auto d-block mb-4"
          />
          <form className="col-lg-9 col-md-9 m-auto text-align-start">
            <label className="fw-bold">First Name</label>
            <MDBInput className="mb-3" label="First name" />

            <label className="fw-bold">Last Name</label>
            <MDBInput className="mb-3" label="Last name" />

            <label className="fw-bold">Email</label>
            <MDBInput type={"email"} label="Email" className="mb-3" />

            <label className="fw-bold">Phone no.</label>
            <MDBInput type={"number"} label="Phone no." />

            <MDBRow className="mt-5 text-end">
              <MDBCol>
                <MDBBtn color="primary" className="mb-3">
                  Submit
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default ProfilePage;
