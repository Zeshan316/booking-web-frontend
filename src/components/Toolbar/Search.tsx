import React from "react";
import {
  MDBInputGroup,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./Search.css";

const Search: React.FC = () => {
  return (
    <MDBInputGroup className="mb-3 d-flex justify-content-center mt-3 p-3">
      <MDBBtn color="info" className="buttonstyle border-info" outline>
        Search By
      </MDBBtn>
      <MDBDropdown>
        <MDBDropdownToggle color="info" className="buttonstyle drop_down">
          Choose
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Last Name</MDBDropdownItem>
          <MDBDropdownItem link>First Name</MDBDropdownItem>
          <MDBDropdownItem link>Trip Date</MDBDropdownItem>
          <MDBDropdownItem link>Status</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

      <form className="input ms-1">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <MDBBtn color="info" className="buttonstyle ms-1">
          Search
        </MDBBtn>
      </form>
    </MDBInputGroup>
  );
};

export default Search;
