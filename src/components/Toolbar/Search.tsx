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
    <MDBInputGroup
      className="mb-3 d-flex justify-content-center mt-3 p-3">
      <MDBBtn outline>Search By</MDBBtn>
      <MDBDropdown>
        <MDBDropdownToggle className="dropdown">Choose</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link>Last Name</MDBDropdownItem>
          <MDBDropdownItem link>First Name</MDBDropdownItem>
          <MDBDropdownItem link>Email</MDBDropdownItem>
          <MDBDropdownItem divider />
          <MDBDropdownItem link>Separated link</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>

      <form className="input ms-2">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <MDBBtn type="button" className="btn btn-primary ms-1">
          search
        </MDBBtn>
      </form>
    </MDBInputGroup>
  );
};

export default Search;
