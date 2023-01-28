import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
} from "mdb-react-ui-kit";
import logo from "../../assests/shuttle-bus.png";

const Header: React.FC = () => {
  return (
    <>
      <MDBNavbar light className="px-5">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <img src={logo} height="40" alt="" loading="lazy" />
            Cabby
          </MDBNavbarBrand>

          <MDBBtn color="primary" type="button">
            Logout
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
