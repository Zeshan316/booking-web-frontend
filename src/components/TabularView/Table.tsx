import React, { useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
  MDBRow,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./RideDetails.css";
import RideDetails from "./RideDetails";
import CreateRide from "../Toolbar/CreateRide";

interface TableData {
  id: number;
  firstName: string;
  lastName: string;
  tripdate: string;
  status: string;
  shift_time: string;
  actions: string[] | JSX.Element[];
  tooltip: string[] | JSX.Element[];
}

const Table: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  const role: string = "Admin";

  const data: TableData[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      tripdate: "31 Jan 2023",
      status: "Awaiting",
      shift_time: "8:00 AM",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
      tooltip: ["Edit your ride", "Delete your ride"],
    },
    {
      id: 2,
      firstName: "Mahnoor",
      lastName: "Ahmed",
      tripdate: "30 Jan 2023",
      status: "Completed",
      shift_time: "5:00 PM",
      actions: [
        <MDBIcon icon="edit" />,
        <MDBIcon icon="trash" />,
        // <MDBIcon icon="lock" />,
      ],
      tooltip: ["Edit your ride", "Delete your ride"],
    },
    {
      id: 3,
      firstName: "Sara",
      lastName: "Khan",
      tripdate: "26 Jan 2023",
      status: "Completed",
      shift_time: "8:00 AM",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
      tooltip: ["Edit your ride", "Delete your ride"],
    },
    {
      id: 4,
      firstName: "Eva",
      lastName: "Green",
      tripdate: "25 Jan 2023",
      status: "Cancelled",
      shift_time: "5:00 PM",
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
      tooltip: ["Edit your ride", "Delete your ride"],
    },
  ];

  return (
    <MDBContainer fluid>
      <section>
        <div className="shadow-4 rounded-4 overflow-hidden bg-light ">
          <MDBTable hover>
            <MDBTableHead className="bg-info">
              <tr>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    icon={isAscending ? "sort-up" : "sort-down"}
                    className="sort-icon me-2"
                    onClick={() => setIsAscending(!isAscending)}
                  />
                  Last Name
                </th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    icon={isAscending ? "sort-up" : "sort-down"}
                    className="sort-icon me-2"
                    onClick={() => setIsAscending(!isAscending)}
                  />
                  First Name
                </th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    icon={isAscending ? "sort-up" : "sort-down"}
                    className="sort-icon me-2"
                    onClick={() => setIsAscending(!isAscending)}
                  />
                  Trip Date
                </th>
                <th className="fw-bold text-white h6">Status</th>
                <th className="fw-bold text-white h6">
                  <MDBIcon
                    icon={isAscending ? "sort-up" : "sort-down"}
                    className="sort-icon me-2"
                    onClick={() => setIsAscending(!isAscending)}
                  />
                  Shift Time
                </th>
                <th className="fw-bold text-white h6">Actions</th>

                {role === "Admin" && (
                  <th className="fw-bold text-white h6"></th>
                )}
              </tr>
            </MDBTableHead>
            <MDBTableBody
              style={{
                verticalAlign: "middle",
              }}
            >
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="items"
                  onClick={() => setIsOpen(true)}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/4.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.lastName}</p>
                        {/* <p className="text-muted mb-0">{item.email}</p> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className=" mb-1">{item.firstName}</p>
                  </td>
                  <td>
                    <p className="mb-0">{item.tripdate}</p>
                  </td>
                  <td>
                    {item.status === "Awaiting" ? (
                      <MDBBadge light color="warning" pill className="status">
                        {item.status}
                      </MDBBadge>
                    ) : item.status === "Completed" ? (
                      <MDBBadge light color="success" pill className="status">
                        {item.status}
                      </MDBBadge>
                    ) : (
                      <MDBBadge light color="danger" pill className="status">
                        {item.status}
                      </MDBBadge>
                    )}
                  </td>
                  <td>{item.shift_time}</td>
                  <td>
                    {item.actions.map((action, i) => (
                      <MDBBtn
                        key={i}
                        className="fs-6 p-2"
                        color="light"
                        size="sm"
                        rippleColor="dark"
                      >
                        <MDBTooltip tag="a" title={item.tooltip[i]}>
                          <span key={item.id} onClick={() => setEdit(true)}>
                            {item.actions[i]}
                          </span>
                        </MDBTooltip>
                      </MDBBtn>
                    ))}
                  </td>
                  {/* {edit && <CreateRide edit />} */}
                  <td>
                    <MDBBtn
                      className="fs-6 p-0"
                      color="light"
                      size="sm"
                      rippleColor="dark"
                    >
                      <MDBTooltip tag="a" title="unlock user">
                        <MDBIcon icon="lock" color="muted" />
                      </MDBTooltip>
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>

          {isOpen && (
            <RideDetails show={isOpen} setShow={() => setIsOpen(!isOpen)} />
          )}
        </div>

        {/* <div className="d-flex justify-content-center p-2 mt-4 bg-light">
          <span className="fw-light">Rows per page: </span> */}
        {/* <MDBSelect className="ms-3">
            <MDBInput selected="10" />
            <MDBSelectOptions>
              <MDBSelectOption value="10">10</MDBSelectOption>
              <MDBSelectOption value="20">20</MDBSelectOption>
              <MDBSelectOption value="30">30</MDBSelectOption>
              <MDBSelectOption value="40">40</MDBSelectOption>
              <MDBSelectOption value="50">50</MDBSelectOption>
            </MDBSelectOptions>
          </MDBSelect> */}

        {/* <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"page-link"}
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={() => console.log("page changed")}
            containerClassName={"pagination"}
            activeClassName={"active"}
          /> */}
        {/* </div> */}
      </section>
    </MDBContainer>
  );
};

export default Table;
