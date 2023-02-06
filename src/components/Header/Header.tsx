import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import logo from "../../assets/bus.png";

const Header: React.FC = () => {
  return (
    <>
      <MDBNavbar light className="px-3">
        <MDBContainer fluid>
          <MDBNavbarBrand className="fs-4 fw-normal">
            <img src={logo} height="50" alt="brand" loading="lazy" />
            DNA Cab Service
          </MDBNavbarBrand>

          <MDBBtn
            color="info"
            type="button"
            className="fw-bold fs-6  text-capitalize"
          >
            Logout
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
