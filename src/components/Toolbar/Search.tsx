import React from "react";
import { MDBInputGroup, MDBBtn } from "mdb-react-ui-kit";
import "./Search.css";
import {
  ITEMS_PER_PAGE,
  RECORDS_PER_PAGE,
  RIDE_STATUSES,
} from "../../common/constants";
import Datetime from "react-datetime";
import dayjs from "dayjs";

interface SearchProps {
  page?: string;
  options: GenericObject[];
  handleSearchClick: () => void;
  handleOption: (e: any) => void;
  searchValue: string;
  handleSearchField: (e: any) => void;
  handleItemsPerPage: (e: any) => void;
  ridesStartDateTime?: Date;
  ridesEndDateTime?: Date;
  handleStartDateTime?: (e: any) => void;
  handleEndDateTime?: (e: any) => void;
  handleFilterRides?: () => void;
  handleDirectionFilter?: (e: any) => void;
}

function Search({
  page = "users",
  options,
  handleSearchClick,
  handleOption,
  searchValue,
  handleSearchField,
  handleItemsPerPage,
  ridesStartDateTime,
  ridesEndDateTime,
  handleStartDateTime,
  handleEndDateTime,
  handleFilterRides,
  handleDirectionFilter,
}: SearchProps): JSX.Element {
  return (
    <>
      {page === "users" && (
        <>
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
                  <option
                    className="options"
                    key={index}
                    value={filter.filterVal}
                  >
                    {filter.readableValue}
                  </option>
                );
              })}
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

          <MDBInputGroup className="mb-1 d-flex justify-content-start mt-2 px-3">
            <MDBBtn color="info" className="buttonstyle border-info " outline>
              Items Per Page
            </MDBBtn>
            <select
              className="pageitem-select bg-light"
              onChange={handleItemsPerPage}
            >
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
          </MDBInputGroup>
        </>
      )}
      {page == "rides" && (
        <>
          <MDBInputGroup className="mb-1 mt-4 p-3 date-time-picker">
            <MDBBtn
              color="info"
              className="bg-info text-white buttonstyle border-info "
              outline
              noRipple
            >
              Start Date
            </MDBBtn>
            <Datetime
              className="readonly"
              // input={false}
              onChange={handleStartDateTime}
              dateFormat={"DD-MM-YYYY"}
              value={ridesStartDateTime}
            />
            <MDBBtn
              color="info"
              className="bg-info text-white buttonstyle border-info ms-2"
              outline
              noRipple
            >
              End Date
            </MDBBtn>
            <Datetime
              onChange={handleEndDateTime}
              dateFormat={"DD-MM-YYYY"}
              value={ridesEndDateTime}
            />
            <select
              className="form-selectt border-1 border-info bg-light text-info ms-3 me-1 f flex-end"
              onChange={handleDirectionFilter}
            >
              <option className="options" defaultValue="">
                Select Ride Direction
              </option>
              <option
                className="options"
                // key={Math.ceil(Math.random() * 50000)}
                value="north"
              >
                North
              </option>
              <option
                className="options"
                // key={Math.ceil(Math.random() * 50000)}
                value="south"
              >
                South
              </option>
            </select>

            <MDBBtn
              color="info"
              className="buttonstyle"
              onClick={handleFilterRides}
            >
              Filter Rides
            </MDBBtn>
          </MDBInputGroup>

          <MDBInputGroup className="mb-0 d-flex justify-content-start mt-2 px-3">
            <MDBBtn color="info" className="buttonstyle border-info " outline>
              Items Per Page
            </MDBBtn>
            <select
              className="pageitem-select bg-light"
              onChange={handleItemsPerPage}
            >
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
          </MDBInputGroup>
        </>
      )}
    </>
  );
}

export default Search;
