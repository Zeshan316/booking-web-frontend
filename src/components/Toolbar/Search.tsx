import React from "react";
import { MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import "./Search.css";
import { ITEMS_PER_PAGE, RECORDS_PER_PAGE } from "../../common/constants";

interface SearchProps {
  options: GenericObject[];
  handleSearchClick: () => void;
  handleOption: (e: any) => void;
  searchValue: string;
  handleSearchField: (e: any) => void;
  handleItemsPerPage: (e: any) => void;
}

function Search({
  options,
  handleSearchClick,
  handleOption,
  searchValue,
  handleSearchField,
  handleItemsPerPage,
}: SearchProps): JSX.Element {
  return (
    <MDBInputGroup className="mb-3 d-flex justify-content-center mt-3 p-3">
      <MDBBtn color="info" className="buttonstyle border-info " outline>
        Search By
      </MDBBtn>
      <select className="form-selectt me-1" onChange={handleOption}>
        <option className="options" defaultValue="">
          Select Filter
        </option>
        {options.map((filter, index) => {
          return (
            <option className="options" key={index} value={filter.filterVal}>
              {filter.readableValue}
            </option>
          );
        })}
      </select>
      {/* <MDBBtn color="info" className="buttonstyle border-info " outline>
        Items per Page
      </MDBBtn> */}

      <select className="pageitem-select" onChange={handleItemsPerPage}>
        {RECORDS_PER_PAGE.map((record, index) => (
          <option
            className="options"
            key={index}
            selected={record === ITEMS_PER_PAGE}
            value={record}
          >
            {record}
          </option>
        ))}
      </select>

      <form className="input ms-1" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchValue}
          onChange={(e) => handleSearchField(e)}
        />
        <MDBBtn
          color="info"
          className="buttonstyle ms-1"
          onClick={handleSearchClick}
        >
          Search
        </MDBBtn>
      </form>
    </MDBInputGroup>
  );
}

export default Search;
