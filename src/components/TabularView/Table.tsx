import React from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";

const Table: React.FC = () => {
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
      actions: [<MDBIcon icon="edit" />, <MDBIcon icon="trash" />],
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
        <div className="shadow-4 rounded-4 overflow-hidden bg-light">
          <MDBTable hover>
            <MDBTableHead style={{ backgroundColor: "#f2f3f5" }}>
              <tr>
                <th className="fw-bold">Last Name</th>
                <th className="fw-bold">First Name</th>
                <th className="fw-bold">Trip Date</th>
                <th className="fw-bold">Status</th>
                <th className="fw-bold">Shift Time</th>
                <th className="fw-bold">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody
              style={{
                verticalAlign: "middle",
                fontSize: "1rem",
                fontWeight: "600",
                color: "darkslategray",
              }}
            >
              {data.map((item) => (
                <tr key={item.id}>
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
                      <MDBBadge light color="warning" pill className="p-2">
                        {item.status}
                      </MDBBadge>
                    ) : item.status === "Completed" ? (
                      <MDBBadge light color="success" pill className="p-2">
                        {item.status}
                      </MDBBadge>
                    ) : (
                      <MDBBadge light color="danger" pill className="p-2">
                        {item.status}
                      </MDBBadge>
                    )}
                  </td>
                  <td>{item.shift_time}</td>
                  <td>
                    {item.actions.map((action, i) => (
                      <MDBBtn
                        className="fw-bold fs-6 p-2"
                        color="link"
                        rounded
                        size="sm"
                        rippleColor="dark"
                      >
                        <MDBTooltip
                          tag="a"
                          wrapperProps={{ href: "#" }}
                          title={item.tooltip[i]}
                        >
                          <span key={item.id}>{action}</span>
                        </MDBTooltip>
                      </MDBBtn>
                    ))}
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </section>
    </MDBContainer>
  );
};

export default Table;
